import logging
import time

from pykka.registry import ActorRegistry

from mormuvid.librarian import Librarian
from mormuvid.downloader import DownloaderActor
from mormuvid.finder import FinderActor
from mormuvid.scout import ScoutActor

logger = logging.getLogger(__name__)

class App:
    """
    Starts everything up ...
    """

    def start(self):
        logger.info("starting up ...")
        librarian = Librarian()
        librarian.clean_up_lock_files()
        downloader = DownloaderActor.start(librarian).proxy()
        finder = FinderActor.start(librarian, downloader).proxy()
        scout = ScoutActor.start(librarian, finder)
        self._wait_for_interrupt()
        logger.info("waiting for actors to stop ...")
        try:
            ActorRegistry.stop_all(timeout=2)
        finally:
            logger.info("exiting")

    def _wait_for_interrupt(self):
        while True:
            try:
                # TODO - must find better way!
                time.sleep(1)
            except (KeyboardInterrupt, SystemExit):
                break
