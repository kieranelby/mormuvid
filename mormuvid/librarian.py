import codecs
import collections
import glob
import json
import logging
import os
import re

from os import path
from os import makedirs
from time import time

from jinja2 import Environment
import pykka

from mormuvid.finder import FinderActor
from mormuvid.downloader import DownloaderActor

logger = logging.getLogger(__name__)

SongStatus = collections.namedtuple('SongStatus', ['state', 'updated_at', 'video_watch_url'])
"""
Represents the status of a song; state can be UNKNOWN, COMPLETED, FAILED, BANNED or QUEUED.
"""

class Librarian:
    """
    Keeps track of which songs have been downloaded (or are downloading) and decides where to store them.
    This implementation generates XBMC/Kodi style .nfo files.
    """

    def __init__(self):
        self.num_queued = 0

    def _get_videos_dir(self):
        home = path.expanduser("~")
        videos_dir = path.join(home, "Videos", "MusicVideos")
        if not path.isdir(videos_dir):
            logger.info("creating new videos_dir at %s", videos_dir)
            makedirs(videos_dir)
        return videos_dir 

    def get_base_filepath(self, song):
        raw_name = song.artist + " - " + song.title
        # TODO: obviously, this won't work at all with non-latin-alphabet song names ...
        safe_name = re.sub(r"[^0-9A-Za-z .,;()_\-]", "_", raw_name)
        base_filepath = path.join(self._get_videos_dir(), safe_name)
        return base_filepath

    def _want_song(self, song):
        if self.too_many_songs_queued():
            return False
        status = self.get_status(song)
        if status.state == 'UNKNOWN':
            return True
        elif status.state == 'COMPLETED' or status.state == 'BANNED':
            return False
        elif status.state == 'QUEUED' or status.state == 'FAILED':
            age_seconds = time() - status.updated_at
            retry_after_seconds = (24 * 60 * 60)
            return age_seconds > retry_after_seconds
        else:
            logger.info("song %s is in invalid state %s", song, status.state)
            return False

    def get_status(self, song):
        nfo_filepath = self._get_nfo_filepath(song)
        if path.isfile(nfo_filepath):
            ctime = os.path.getctime(nfo_filepath)
            return SongStatus('COMPLETED', ctime, None)
        lock_filepath = self._get_lock_filepath(song)
        if path.isfile(lock_filepath):
            return self._read_lock_file(lock_filepath)
        return SongStatus('UNKNOWN', time(), None)

    def _get_finder(self):
        refs = pykka.ActorRegistry.get_by_class(FinderActor)
        return refs[0].proxy()

    def _get_downloader(self):
        refs = pykka.ActorRegistry.get_by_class(DownloaderActor)
        return refs[0].proxy()

    def notify_song_scouted(self, song):
        wanted = self._want_song(song)
        if wanted:
            self._notify_search_queued(song)
            self._get_finder().find(song)
        else:
            logger.info("don't currently want/need song {}".format(song))
        return

    def _notify_search_queued(self, song):
        self.num_queued += 1
        self._write_lock_file(song, 'QUEUED', None)
        return

    def notify_song_found(self, song, video_watch_url):
        logger.info("queueing download of {}".format(song))
        song.mark_found(video_watch_url)
        self._notify_download_queued(song)
        self._get_downloader().download(song)
        return

    def notify_song_not_found(self, song):
        self.num_queued -= 1
        self._write_lock_file(song, 'FAILED', None)
        return

    def _notify_download_queued(self, song):
        self._write_lock_file(song, 'QUEUED', song.video_watch_url)
        return

    def notify_download_failed(self, song):
        self.num_queued -= 1
        self._write_lock_file(song, 'FAILED', song.video_watch_url)
        return

    def notify_download_cancelled(self, song):
        self.num_queued -= 1
        self._delete_lock_file(song)
        return

    def notify_download_completed(self, song):
        self.num_queued -= 1
        self._delete_lock_file(song)
        self._write_nfo_file(song, song.video_watch_url)
        return

    def _get_nfo_filepath(self, song):
        return self.get_base_filepath(song) + '.nfo'

    nfo_template_str = """<musicvideo>
  <title>{{song.title}}</title>
  <artist>{{song.artist}}</artist>
  <album>{{song.artist}}</album>
  <genre>Pop</genre>
  <director></director>
  <composer></composer>
  <studio></studio>
  <year></year>
  <runtime></runtime>
  <mormuvid>
     <downloadedFrom>{{video_watch_url}}</downloadedFrom>
  </mormuvid>
</musicvideo>
"""

    def _write_nfo_file(self, song, video_watch_url):
        nfo_filepath = self._get_nfo_filepath(song)
        env = Environment(autoescape = True)
        template = env.from_string(self.nfo_template_str)
        nfo_xml = template.render(song = song, video_watch_url = video_watch_url)
        with codecs.open(nfo_filepath, 'w', 'utf-8') as f:
            f.write(nfo_xml)
        return

    def _get_lock_filepath(self, song):
        return self.get_base_filepath(song) + '.lock'

    def _write_lock_file(self, song, state, video_watch_url):
        lock_filepath = self._get_lock_filepath(song)
        now = time()
        py_content = {'state' : state, 'updated_at' : now, 'video_watch_url' : video_watch_url}
        js_content = json.dumps(py_content)
        with codecs.open(lock_filepath, 'w', encoding='utf-8') as f:
            f.write(js_content)
        return

    def _read_lock_file(self, lock_filepath):
        with codecs.open(lock_filepath, 'r', encoding='utf-8') as f:
            js_content = f.read()
        py_content = json.loads(js_content)
        return SongStatus(py_content['state'], py_content['updated_at'], py_content['video_watch_url'])

    def _delete_lock_file(self, song):
        lock_filepath = self._get_lock_filepath(song)
        os.remove(lock_filepath)

    def too_many_songs_queued(self):
        return self.num_queued >= 5

    def _clean_up_lock_files(self):
        logger.info("cleaning up lock files")
        videos_dir = self._get_videos_dir()
        for lock_filepath in glob.iglob(path.join(videos_dir,'*.lock')):
          status = self._read_lock_file(lock_filepath)
          is_stale = False
          if status.state == 'QUEUED':
              is_stale = True
          elif status.state == 'FAILED':
              age_seconds = time() - status.updated_at
              retry_after_seconds = (24 * 60 * 60)
              is_stale = age_seconds > retry_after_seconds
          if is_stale:
              os.remove(lock_filepath)

    def start(self):
        logger.info("videos_dir is %s", self._get_videos_dir())
        self._clean_up_lock_files()
