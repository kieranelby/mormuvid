import re
import codecs
from os import path

from jinja2 import Environment

class Librarian:
    """
    Keeps track of which songs have been downloaded (or are downloading) and decides where to store them.
    This implementation generates XBMC/Kodi style .nfo files.
    """

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
  <mormuvid><status>{{status}}</status></mormuvid>
</musicvideo>
"""

    def want_song(self, song):
        nfo_filename = self._get_nfo_filepath(song)
        if path.isfile(nfo_filename):
            return False
        else:
            return True

    def notify_download_queued(self, song, video_watch_url):
        self._write_nfo_file(song, 'QUEUED')
        return

    def notify_download_completed(self, song):
        self._write_nfo_file(song, 'COMPLETED')
        return

    def notify_download_failed(self, song):
        self._write_nfo_file(song, 'FAILED')
        return

    def get_base_filepath(self, song):
        raw = song.artist + " - " + song.title
        # TODO: obviously, this won't work at all with non-latin-alphabet song names ...
        safe = re.sub(r"[^0-9A-Za-z .,;()_\-]", "_", raw)
        return safe

    def _get_nfo_filepath(self, song):
        return self.get_base_filepath(song) + '.nfo'

    def _write_nfo_file(self, song, status):
        nfo_filename = self._get_nfo_filepath(song)
        env = Environment(autoescape = True)
        template = env.from_string(self.nfo_template_str)
        nfo_xml = template.render(song = song, status = status)
        target = codecs.open(nfo_filename, 'w', 'utf-8')
        target.write(nfo_xml)
        target.close()
        return
