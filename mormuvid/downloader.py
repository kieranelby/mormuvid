import logging
from subprocess32 import Popen
from os import path

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

class ShutdownException(Exception):
    def __init__(self, value):
        self.value = value
    def __str__(self):
        return repr(self.value)

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

    def download_song(self, song):
        if self.is_shutdown:
            logger.info("not downloading %s since shutting down", song)
            self.librarian.notify_download_cancelled(song)
            return
        base_filepath = self.librarian.get_base_filepath(song)
        output_template = base_filepath + ".%(ext)s"
        logger.info("attempting to download %s from %s to %s", song, song.video_watch_url, base_filepath)
        try:
            self._download_video(song.video_watch_url, output_template)
        except ShutdownException:
            logger.info("cancelling download of %s since shutting down", song)
            self.librarian.notify_download_cancelled(song)
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
        popen = Popen(command, start_new_session=True)
        self.subprocess = popen
        resultcode = popen.wait()
        self.subprocess = None
        if resultcode != 0:
            if self.is_shutdown:
                raise ShutdownException("cancelled download of %s since shutting down", video_watch_url)
            else:
                raise Exception("subcommand %s returned non-zero exit code %s", command, resultcode)

