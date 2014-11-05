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

import pykka

from mormuvid.finder import FinderActor
from mormuvid.downloader import DownloaderActor
from mormuvid.song import Song

logger = logging.getLogger(__name__)

class Librarian:
    """
    Keeps track of which songs have been downloaded (or are downloading) and decides where to store them.
    This implementation generates XBMC/Kodi style .nfo files for successfully downloaded songs.
    It writes .lock files for songs that are in progress / failed / banned.
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

    def _is_download_wanted(self, possible_new_song):
        if self._too_many_songs_queued():
            logger.info("don't want song %s right now since too many songs already queued up", possible_new_song)
            return False
        persisted_song = self.retrieve(possible_new_song)
        if persisted_song is None:
            logger.info("want song %s since have no record of it", possible_new_song)
            return True
        else:
            return persisted_song.is_download_wanted()

    def get_songs(self):
        logger.info("cleaning up lock files")
        videos_dir = self._get_videos_dir()
        songs = []
        for nfo_filepath in glob.iglob(path.join(videos_dir,'*.nfo')):
            song = self._read_nfo_file(nfo_filepath)
            songs.append(song)
        for lock_filepath in glob.iglob(path.join(videos_dir,'*.lock')):
            song = self._read_lock_file(lock_filepath)
            if song is not None:
                songs.append(song)
        return songs

    def retrieve(self, song):
        nfo_filepath = self._get_nfo_filepath(song)
        if path.isfile(nfo_filepath):
            ctime = os.path.getctime(nfo_filepath)
            return self._read_nfo_file(nfo_filepath)
        lock_filepath = self._get_lock_filepath(song)
        if path.isfile(lock_filepath):
            return self._read_lock_file(lock_filepath)
        return None

    def _get_finder(self):
        refs = pykka.ActorRegistry.get_by_class(FinderActor)
        return refs[0].proxy()

    def _get_downloader(self):
        refs = pykka.ActorRegistry.get_by_class(DownloaderActor)
        return refs[0].proxy()

    def notify_song_scouted(self, song):
        wanted = self._is_download_wanted(song)
        if wanted:
            self._notify_find_queued(song)
            self._get_finder().find(song)
        else:
            logger.info("don't currently want/need song {}".format(song))
        return

    def _notify_find_queued(self, song):
        self.num_queued += 1
        song.mark_find_queued()
        self._write_lock_file(song)
        return

    def notify_song_found(self, song, video_watch_url):
        logger.info("queueing download of {}".format(song))
        song.mark_found(video_watch_url)
        self._notify_download_queued(song)
        self._get_downloader().download(song)
        return

    def notify_song_not_found(self, song):
        self.num_queued -= 1
        song.mark_failed()
        self._write_lock_file(song)
        return

    def _notify_download_queued(self, song):
        # hack: assume song was already included in num_queued
        song.mark_download_queued()
        self._write_lock_file(song)
        return

    def notify_download_failed(self, song):
        self.num_queued -= 1
        song.mark_failed()
        self._write_lock_file(song)
        return

    def notify_download_cancelled(self, song):
        self.num_queued -= 1
        self._delete_lock_file(song)
        return

    def notify_download_completed(self, song):
        self.num_queued -= 1
        song.mark_downloaded()
        self._delete_lock_file(song)
        self._write_nfo_file(song)
        return

    def _get_nfo_filepath(self, song):
        return self.get_base_filepath(song) + '.nfo'

    def _write_nfo_file(self, song):
        nfo_filepath = self._get_nfo_filepath(song)
        nfo_xml = song.to_nfo_xml()
        with codecs.open(nfo_filepath, 'w', 'utf-8') as f:
            f.write(nfo_xml)
        return

    def _read_nfo_file(self, nfo_filepath):
        logger.info("reading nfo_file %s", nfo_filepath)
        with codecs.open(nfo_filepath, 'r', encoding='utf-8') as f:
            xml_content = f.read()
        return Song.from_nfo_xml(xml_content)

    def _get_lock_filepath(self, song):
        return self.get_base_filepath(song) + '.lock'

    def _write_lock_file(self, song):
        lock_filepath = self._get_lock_filepath(song)
        nfo_xml = song.to_nfo_xml()
        with codecs.open(lock_filepath, 'w', 'utf-8') as f:
            f.write(nfo_xml)
        return

    def _read_lock_file(self, lock_filepath):
        logger.info("reading lock_file %s", lock_filepath)
        with codecs.open(lock_filepath, 'r', encoding='utf-8') as f:
            xml_content = f.read()
        song = Song.from_nfo_xml(xml_content)
        if song.is_stale():
            logger.info("removing lock file for stale song %s (status %s)", song, song.status)
            os.remove(lock_filepath)
            return None
        return song

    def _delete_lock_file(self, song):
        lock_filepath = self._get_lock_filepath(song)
        os.remove(lock_filepath)

    def _too_many_songs_queued(self):
        return self.num_queued >= 5

    def _clean_up_lock_files(self):
        logger.info("cleaning up lock files")
        videos_dir = self._get_videos_dir()
        for lock_filepath in glob.iglob(path.join(videos_dir,'*.lock')):
            # will clean up stale ones as a side-effect
            song = self._read_lock_file(lock_filepath)

    def start(self):
        logger.info("videos_dir is %s", self._get_videos_dir())
        self._clean_up_lock_files()
