import logging
import os

from bottle import route, run, debug, static_file

import jsonpickle

logger = logging.getLogger(__name__)
librarian = None

_ROOT = os.path.abspath(os.path.dirname(__file__))
def get_www_path(path):
    return os.path.join(_ROOT, 'www', path)

def start_web_and_block(the_librarian):
    global librarian
    librarian = the_librarian
    debug(True)
    run(host='0.0.0.0', port=2156)

def stop_web():
    """Request for the server to shutdown."""
    # TODO - need to figure out how to stop bottle!
    pass

@route('/')
def home():
    return server_static('index.html')

@route('/<filename>')
def server_static(filename):
    return static_file(filename, root=get_www_path('static'))

@route('/vendor/<filename>')
def server_static_vendor(filename):
    return static_file(filename, root=os.path.join(get_www_path('static'),'vendor'))

@route('/api/songs')
def api_songs():
    global librarian
    songs = librarian.get_songs()
    return jsonpickle.encode(songs)
