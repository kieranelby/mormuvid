import logging
from os import path

import pykka
import gevent.subprocess

logger = logging.getLogger(__name__)

class DownloaderActor(pykka.gevent.GeventActor):
    """
    Given a URL where a music video can be watched, downloads the video file.
    This implementation uses the rather excellent YoutubeDL.
    """

    def __init__(self, librarian):
        super(DownloaderActor, self).__init__()
        self.librarian = librarian

    def download_song(self, song):
        base_filepath = self.librarian.get_base_filepath(song)
        output_template = base_filepath + ".%(ext)s"
        logger.info("attempting to download %s from %s to %s", song, song.video_watch_url, base_filepath)
        try:
            self._download_video(song.video_watch_url, output_template)
        except Exception:
            logger.exception("download of %s from %s failed", song, song.video_watch_url)
            self.librarian.notify_download_failed(song)
        else:
            logger.info("download of %s completed", song)
            self.librarian.notify_download_completed(song)

    def download_other_video(self, video):
        base_dir = self.librarian.get_others_dir()
        logger.info("attempting to download other video %s to %s", video, base_dir)
        output_template = path.join(base_dir, "%(title)s-%(id)s.%(ext)s")
        self._download_video(video['videoURL'], output_template)


    def _download_video(self, video_watch_url, output_template):
        command = ['youtube-dl', '-o', output_template,
                  '--no-progress', '--no-mtime', '-c',  video_watch_url]
        popen = gevent.subprocess.Popen(command)
        self.subprocess = popen
        resultcode = popen.wait()
        self.subprocess = None
        if resultcode != 0:
            raise Exception("subcommand %s returned non-zero exit code %s", command, resultcode)
