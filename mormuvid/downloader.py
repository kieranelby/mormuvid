import logging
from subprocess32 import check_call

import pykka

logger = logging.getLogger(__name__)

class DownloaderActor(pykka.ThreadingActor):
    """
    Given a URL where a music video can be watched, downloads the video file.
    This implementation uses the rather excellent YoutubeDL.
    """

    use_daemon_thread = True
    """
    Want this to exit when the main thread exits.
    """

    def __init__(self, librarian):
        super(DownloaderActor, self).__init__()
        self.librarian = librarian

    def download(self, song, video_watch_url):
        base_filepath = self.librarian.get_base_filepath(song)
        logger.info("attempting to download %s from %s to %s", song, video_watch_url, base_filepath)
        try:
            output_template = base_filepath + ".%(ext)s"
            command = ['youtube-dl', '-o', output_template,
                       '--no-progress', '--no-mtime', '-c',  video_watch_url]
            # TODO: is there an easy way to make the subprocess
            # automatically exit if this thread dies ...
            check_call(command, shell=False)
        except Exception:
            logger.exception("download of %s from %s failed", song, video_watch_url)
            self.librarian.notify_download_failed(song, video_watch_url)
        else:
            logger.info("download of %s completed", song)
            self.librarian.notify_download_completed(song, video_watch_url)
