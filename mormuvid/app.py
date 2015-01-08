import logging
import time
import signal

from pykka.registry import ActorRegistry

from mormuvid.librarian import Librarian
from mormuvid.downloader import DownloaderActor
from mormuvid.downloader import shutdown_downloaders
from mormuvid.finder import FinderActor
from mormuvid.scout import ScoutActor
from mormuvid.web import start_web_and_block
from mormuvid.web import stop_web
from mormuvid.settings import get_settings

logger = logging.getLogger(__name__)

_apps = []

def _signal_handler(signum, frame):
    global _apps
    logger.info("caught signal")
    for app in _apps:
        app.stop()
    _apps = []

def _hook_signals():
    signal.signal(signal.SIGINT, _signal_handler)

def _register_app(app):
    global _apps
    _apps.append(app)

class App:
    """
    Starts and stops everything.
    """

    def start(self):
        logger.info("starting up ...")
        _hook_signals()
        _register_app(self)
        settings = get_settings()
        librarian = Librarian(settings['scoutedDailyQuota'])
        librarian.start()
        DownloaderActor.start(librarian)
        FinderActor.start(librarian)
        ScoutActor.start(librarian)
        start_web_and_block(librarian)

    def stop(self):
        logger.info("exiting ...")
        logger.info("stopping downloaders ...")
        shutdown_downloaders()
        logger.info("waiting for actors to stop ...")
        try:
            ActorRegistry.stop_all(timeout=30)
        except Exception:
            logger.exception()
        logger.info("stopping web server ...")
        stop_web()
        logger.info("finished")
