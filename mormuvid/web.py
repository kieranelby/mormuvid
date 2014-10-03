import logging
import os

from bottle import route, run, debug, static_file

logger = logging.getLogger(__name__)

_ROOT = os.path.abspath(os.path.dirname(__file__))
def get_www_path(path):
    return os.path.join(_ROOT, 'www', path)

def start_web_and_block():
    debug(True)
    run()

def stop_web():
    """Request for the server to shutdown."""
    # TODO - need to figure out how to stop bottle!
    pass

@route('/')
def home():
    return "Hello World!"

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root=get_www_path('static'))
