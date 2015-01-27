import logging
import os

from gevent import monkey; monkey.patch_all()
from gevent import spawn;
from gevent.pywsgi import WSGIServer
from geventwebsocket import WebSocketError
from geventwebsocket.handler import WebSocketHandler
from gevent.queue import Queue

import jsonpickle

logger = logging.getLogger(__name__)
wrapped_wsgi_http_app = None
notification_queues = []

def wrap_wsgi_http_app(wsgi_http_app):
    global wrapped_wsgi_http_app
    wrapped_wsgi_http_app = wsgi_http_app
    listen_addr = '0.0.0.0'
    listen_port = 2156
    webserver = WSGIServer((listen_addr, listen_port), our_wsgi_app, handler_class=WebSocketHandler)
    return webserver

def broadcast_notification(notification):
    global notification_queues
    logger.info("add notification %s to %s outbound queues", notification, len(notification_queues))
    for notification_queue in notification_queues:
        notification_queue.put(notification)

def our_wsgi_app(environ, start_response):
    global wrapped_wsgi_http_app
    websocket = environ.get("wsgi.websocket")
    if websocket is None:
        logger.info("passing http request to wrapped app")
        return wrapped_wsgi_http_app(environ, start_response)
    notification_queue = None
    try:
        logger.info("got new websocket connection")
        logger.info("creating new notification queue")
        notification_queue = Queue()
        notification_queues.append(notification_queue)
        logger.info("spawning greenlets to handle new websocket")
        spawn(publish_to_websocket, websocket, notification_queue)
        poll_websocket(websocket, notification_queue)
        cleanup_websocket(websocket, notification_queue)
    except WebSocketError as ex:
        print "{0}: {1}".format(ex.__class__.__name__, ex)
    finally:
        cleanup_websocket(websocket, notification_queue)
    pass

def cleanup_websocket(wsock, notification_queue):
    global notification_queues
    logger.info("cleaning up broken websocket connection")
    try:
        wsock.close()
    except:
       pass
    try:
        notification_queues.remove(notification_queue)
    except:
        pass

def poll_websocket(wsock, notification_queue):
    while True:
        try:
            incoming_message = wsock.receive()
            logger.info("got message on websocket: %s", incoming_message)
        except WebSocketError as ex:
            print "{0}: {1}".format(ex.__class__.__name__, ex)
            cleanup_websocket(wsock, notification_queue)
            break

def publish_to_websocket(wsock, notification_queue):
    while True:
        try:
            notification = notification_queue.get()
            outbound_message = jsonpickle.encode({'notification': notification})
            logger.info("sending notification %s", notification)
            wsock.send(outbound_message)
        except WebSocketError as ex:
            print "{0}: {1}".format(ex.__class__.__name__, ex)
            cleanup_websocket(wsock, notification_queue)
            break
