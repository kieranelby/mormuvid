import logging
import os

from bottle import app, route, request, static_file, HTTPResponse
from requestlogger import WSGILogger, ApacheFormatter

import jsonpickle

from mormuvid.song import Song
from mormuvid.settings import get_settings
from mormuvid.settings import update_settings
from mormuvid.bans import add_ban, get_bans, get_ban, remove_ban
from mormuvid.notifications import wrap_wsgi_http_app

logger = logging.getLogger(__name__)
librarian = None
webserver = None

_ROOT = os.path.abspath(os.path.dirname(__file__))
_STATIC_PATH = os.path.join(_ROOT, 'client', 'dist')

def start_web_and_block(the_librarian):
    global librarian
    global app
    global webserver
    global wsgi_http_app
    librarian = the_librarian
    functional_wsgi_http_app = app()
    logging_wsgi_http_app = WSGILogger(functional_wsgi_http_app, [], ApacheFormatter())
    listen_addr = '0.0.0.0'
    listen_port = 2156
    webserver = wrap_wsgi_http_app(logging_wsgi_http_app, listen_addr, listen_port)
    logger.info("listening on %s:%s", listen_addr, listen_port)
    webserver.serve_forever()

def stop_web():
    """Request for the server to shutdown."""
    webserver.stop()

@route('/api/songs', method='GET')
def api_songs():
    global librarian
    songs = librarian.get_songs()
    return jsonpickle.encode({'songs': songs})

@route('/api/songs', method='POST')
def api_songs_create():
    global librarian
    broadcast_notification
    requestSong = request.json['song']
    artist = requestSong['artist']
    title = requestSong['title']
    videoURL = requestSong['videoURL']
    logger.info("adding song %s by %s at %s", title, artist, videoURL)
    song = librarian.notify_song_requested(artist, title, videoURL)
    return jsonpickle.encode({'song': song})

@route('/api/songs/<song_id>')
def api_song(song_id):
    global librarian
    song = librarian.get_song_by_id(song_id)
    if song is not None:
        return jsonpickle.encode({'song': song})

@route('/api/songs/<song_id>', method='PUT')
def api_song_update(song_id):
    global librarian
    requestSong = request.json['song']
    artist = requestSong['artist']
    title = requestSong['title']
    resulting_song = librarian.update_existing_song(song_id, artist, title)
    if resulting_song is None:
        render_json_error_response("could not update song")
    else:
        return jsonpickle.encode({'song': resulting_song})

@route('/api/songs/<song_id>', method='DELETE')
def api_song_delete(song_id):
    global librarian
    song = librarian.get_song_by_id(song_id)
    if song is not None:
        librarian.delete(song)
    return HTTPResponse(status=204)

@route('/api/videos', method='POST')
def api_videos_create():
    global librarian
    requestVideo = request.json['video']
    videoURL = requestVideo['videoURL']
    logger.info("adding other video %s", videoURL)
    video = librarian.request_other_video(videoURL)
    return jsonpickle.encode({'video': video})

@route('/api/settings/<dummy_id>', method='GET')
def api_settings_get(dummy_id):
    settings = get_settings()
    return jsonpickle.encode({'settings': settings})

@route('/api/settings/<dummy_id>', method='PUT')
def api_settings_put(dummy_id):
    settings_from_request = request.json['settings']
    try:
        update_settings(settings_from_request)
    except Exception as e:
        logger.error("failed to save settings due to %s", e)
        render_json_error_response("failed to save settings")
    return api_settings_get(dummy_id)

@route('/api/bans', method='GET')
def api_bans():
    bans = get_bans()
    return jsonpickle.encode({'bans': bans})

@route('/api/bans/<ban_id>', method='GET')
def api_bans_get(ban_id):
    ban = get_ban(ban_id)
    return jsonpickle.encode({'ban': ban})

@route('/api/bans/<ban_id>', method='DELETE')
def api_bans_delete(ban_id):
    ban = remove_ban(ban_id)
    return HTTPResponse(status=204)

@route('/api/bans', method='POST')
def api_bans_create():
    requested_ban = request.json['ban']
    ban = add_ban(requested_ban['artist'], requested_ban['title'])
    return jsonpickle.encode({'ban': ban})

@route('/')
def root():
    return other_path('index.html')

@route('/<other_path:path>')
def other_path(other_path):
    logger.info("playing static file %s from %s", other_path, _STATIC_PATH)
    return static_file(other_path, root=_STATIC_PATH)

def render_json_error_response(err_msg):
    errors = {
      "errors": {
         "unknown": [ err_msg ]
        }
    }
    # the ember data rest adapter likes HTTP 422 for errors ...
    raise HTTPResponse(body=jsonpickle.encode(errors), status=422)
