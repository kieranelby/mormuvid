import cherrypy

def start_web_and_block():
    cherrypy.quickstart(Web())

def stop_web():
    cherrypy.engine.exit()

class Web(object):
    @cherrypy.expose
    def index(self):
        return "Hello World!"
