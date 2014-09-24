import logging

from mormuvid.app import App

def main():
    """
    Entry point when run on the command-line as mormuvid.
    """
    logging.basicConfig(level=logging.DEBUG)
    app = App()
    app.start()
