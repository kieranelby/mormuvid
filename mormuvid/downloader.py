import logging
from subprocess32 import Popen

import pykka

logger = logging.getLogger(__name__)

_downloaders = []
def _register_downloader(downloader):
    global _downloaders
    _downloaders.append(downloader)

def shutdown_downloaders():
    """
    Unfortunately the normal actor.stop() doesn't work well if the
    downloader is blocked waiting for a subprocess - use this to
    stop the downloader (presumably from another thread).
    """
    global _downloaders
    logger.info("shutting down downloaders")
    for downloader in _downloaders:
        downloader.shutdown()

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
        self.subprocess = None
        self.is_shutdown = False
        _register_downloader(self)

    def shutdown(self):
        self.is_shutdown = True
        if self.subprocess is not None:
            logger.info("killing subprocess %s", self.subprocess.pid)
            self.subprocess.terminate()

    def download(self, song, video_watch_url):
        if self.is_shutdown:
            logger.info("not downloading %s since shutting down", song)
            self.librarian.notify_download_cancelled(song)
            return
        base_filepath = self.librarian.get_base_filepath(song)
        logger.info("attempting to download %s from %s to %s", song, video_watch_url, base_filepath)
        try:
            output_template = base_filepath + ".%(ext)s"
            command = ['youtube-dl', '-o', output_template,
                       '--no-progress', '--no-mtime', '-c',  video_watch_url]
            # TODO: is there an easy way to make the subprocess
            # automatically exit if this thread dies ...
            # TODO: actor will be unresponsive if we block here?
            # But if we don't block then how to avoid kicking off
            # too many parallel downloads?
            # TODO - would be nice to use a timeout too.
            popen = Popen(command, start_new_session=True)
            self.subprocess = popen
            resultcode = popen.wait()
            self.subprocess = None
            if resultcode != 0:
                if self.is_shutdown:
                    logger.info("cancelling download of %s since shutting down", song)
                    self.librarian.notify_download_cancelled(song)
                    return
                else:
                    raise Exception("subcommand %s returned non-zero exit code %s", command, resultcode)
        except Exception:
            logger.exception("download of %s from %s failed", song, video_watch_url)
            self.librarian.notify_download_failed(song, video_watch_url)
        else:
            logger.info("download of %s completed", song)
            self.librarian.notify_download_completed(song, video_watch_url)
