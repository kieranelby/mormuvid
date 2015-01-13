import logging
import re

from time import time

from jinja2 import Environment
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

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
     <status>{{song.status}}</status>
     <updated_at>{{song.updated_at}}</updated_at>
     <video_watch_url>{{song.video_watch_url or ''}}</video_watch_url>
     <scouted_by>{{song.scouted_by or ''}}</scouted_by>
  </mormuvid>
</musicvideo>
"""

def _make_id(artist, title):
    raw_name = artist + " - " + title
    ascii_name = raw_name.encode('punycode')
    safe_name = re.sub(r"[^0-9A-Za-z .,;()_\-]", "_", ascii_name)
    return safe_name

class Song(object):
    """
    Represents a song.
    """
    def __init__(self, artist, title, song_id=None, scouted_by=None):
        self.status = 'SCOUTED'
        self.artist = artist
        # make album name up for now
        self.album = artist
        self.title = title
        if song_id is None:
            self.id = _make_id(artist,title);
        else:
            self.id = song_id
        self.video_watch_url = None
        self.scouted_by = scouted_by
        self.mark_updated()

    def mark_updated(self):
        self.updated_at = time()

    def mark_found(self, video_watch_url):
        self.status = 'FOUND'
        self.mark_updated()
        self.video_watch_url = video_watch_url

    def mark_find_queued(self):
        self.status = 'FIND_QUEUED'
        self.mark_updated()

    def mark_download_queued(self):
        self.status = 'DOWNLOAD_QUEUED'
        self.mark_updated()

    def mark_failed(self):
        self.status = 'FAILED'
        self.mark_updated()

    def mark_downloaded(self):
        self.status = 'COMPLETED'
        self.mark_updated()

    def is_queued(self):
        return self.status in ['FIND_QUEUED', 'DOWNLOAD_QUEUED']

    def get_base_file_name_wo_ext(self):
        return self.id

    def to_nfo_xml(self):
        global nfo_template_str
        env = Environment(autoescape = True)
        template = env.from_string(nfo_template_str)
        nfo_xml = template.render(song = self)
        return nfo_xml

    def is_stale(self):
        """
        Can we forget about this song?
        """
        status = self.status
        if status in ['COMPLETED']:
            # no, this is definitely still needed
            return False
        elif status in ['FIND_QUEUED', 'DOWNLOAD_QUEUED', 'FAILED', 'FOUND']:
            # these statuses should be temporary  - assume something
            # got stuck after a while and remove entry
            age_seconds = time() - self.updated_at
            retry_after_seconds = (24 * 60 * 60)
            return age_seconds > retry_after_seconds
        else:
            # unknown status - guess leave it alone.
            return False

    def __str__(self):
        return '"{}" by "{}"'.format(
            self.title.encode('unicode-escape'),
            self.artist.encode('unicode-escape')
        )

    @staticmethod
    def from_nfo_xml(nfo_xml, base_file_name_wo_ext=None):
        is_mormuvid_file = True
        soup = BeautifulSoup(nfo_xml)
        musicvideo = soup.musicvideo
        song = Song(musicvideo.artist.string.strip(), musicvideo.title.string.strip(), base_file_name_wo_ext)
        song.album = musicvideo.album.string.strip()
        mormuvid_info = soup.musicvideo.mormuvid
        if mormuvid_info is None:
            is_mormuvid_file = False
        else:
            status = mormuvid_info.find('status', recursive=False)
            if status is None:
                is_mormuvid_file = False
        if not is_mormuvid_file:
            song.status = 'COMPLETED'
            song.updated_at = None
            song.video_watch_url = None
            song.scouted_by = None
        else:
            song.status = mormuvid_info.status.string.strip()
            song.updated_at = float(mormuvid_info.updated_at.string.strip())
            song.video_watch_url = mormuvid_info.video_watch_url.string.strip()
            try:
                song.scouted_by = mormuvid_info.scouted_by.string.strip()
            except:
                song.scouted_by = None

        return song
