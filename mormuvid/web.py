import logging
import os

from bottle import route, run, debug, static_file

import jsonpickle

logger = logging.getLogger(__name__)
librarian = None

_ROOT = os.path.abspath(os.path.dirname(__file__))
_STATIC_PATH = os.path.join(_ROOT, 'client', 'dist')

def start_web_and_block(the_librarian):
    global librarian
    librarian = the_librarian
    debug(True)
    run(host='0.0.0.0', port=2156)

def stop_web():
    """Request for the server to shutdown."""
    # TODO - need to figure out how to stop bottle!
    pass

@route('/api/songs')
def api_songs():
    global librarian
    songs = librarian.get_songs()
    return jsonpickle.encode({'songs': songs})

@route('/api/songs/<song_id>')
def api_song(song_id):
    global librarian
    song = librarian.get_song_by_id(song_id)
    if song is not None:
        return jsonpickle.encode({'song': song})

@route('/<other_path:path>')
def other_path(other_path):
    logger.info("playing static file %s from %s", other_path, _STATIC_PATH)
    return static_file(other_path, root=_STATIC_PATH)
