from time import time

from jinja2 import Environment
from bs4 import BeautifulSoup

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
     <video_watch_url>{{song.video_watch_url}}</video_watch_url>
  </mormuvid>
</musicvideo>
"""

class Song(object):
    """
    Represents a song.
    """
    def __init__(self, artist, title):
        self.status = 'SCOUTED'
        self.artist = artist
        # make album name up for now
        self.album = artist
        self.title = title
        self.mark_updated()
        self.video_watch_url = None

    def mark_updated(self):
        self.updated_at = time()

    def mark_found(self, video_watch_url):
        self.status = 'FOUND'
        self.mark_updated()
        self.video_watch_url = video_watch_url

    def mark_queued(self):
        self.status = 'QUEUED'
        self.mark_updated()

    def mark_failed(self):
        self.status = 'FAILED'
        self.mark_updated()

    def mark_downloaded(self):
        self.status = 'COMPLETED'
        self.mark_updated()

    def to_nfo_xml(self):
        global nfo_template_str
        env = Environment(autoescape = True)
        template = env.from_string(nfo_template_str)
        nfo_xml = template.render(song = self)
        return nfo_xml

    def __str__(self):
        return '"{}" by "{}"'.format(self.title, self.artist)

    @staticmethod
    def from_nfo_xml(nfo_xml):
        soup = BeautifulSoup(nfo_xml)
        musicvideo = soup.musicvideo
        song = Song(musicvideo.artist.string.strip(), musicvideo.title.string.strip())
        song.album = musicvideo.album.string.strip()
        mormuvid = soup.musicvideo.mormuvid
        song.status = mormuvid.status.string.strip()
        song.updated_at = float(mormuvid.updated_at.string.strip())
        song.video_watch_url = mormuvid.video_watch_url.string.strip()
        return song
