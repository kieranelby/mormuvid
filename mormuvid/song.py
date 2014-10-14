import collections

class Song(object):
    """
    Represents a song.
    """
    def __init__(self, artist, title):
        self.status = 'SCOUTED'
        self.artist = artist
        self.title = title
        self.video_watch_url = None

    def mark_found(self, video_watch_url):
        self.status = 'FOUND'
        self.video_watch_url = video_watch_url

    def __str__(self):
        return '"{}" by "{}"'.format(self.title, self.artist)
