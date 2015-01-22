import logging
import requests
from threading import Timer
import time

import pykka
from bs4 import BeautifulSoup

from mormuvid.song import Song

logger = logging.getLogger(__name__)

class ScoutActor(pykka.gevent.GeventActor):
    """
    Discovers the names of popular songs.
    This implementation scrapes the 1.FM Top 40 play list.
    """

    recent_playlist_url = "http://www.1.fm/home/stationplaylist?id=top40"
    scrape_interval_seconds = 30

    SCOUTED_BY_NAME = "1.FM"

    def __init__(self, librarian):
        super(ScoutActor, self).__init__()
        self.proxy = self.actor_ref.proxy()
        self.session = requests.Session()
        self.librarian = librarian
        self.timer = None

    def on_start(self):
        self._queue_scout_songs_and_repeat()

    def on_stop(self):
        self._cancel_timer()

    def _queue_scout_songs_and_repeat(self):
        self.proxy.scout_songs_and_repeat()

    def _cancel_timer(self):
        if self.timer is not None:
            self.timer.cancel()
            self.timer = None

    def _schedule_scout_songs_and_repeat(self, last_scrape_at):
        self._cancel_timer()
        next_scrape_due_at = last_scrape_at + self.scrape_interval_seconds
        delay = next_scrape_due_at - time.time()
        if delay < 0:
            delay = 0
        logger.info("will wait {} seconds before scouting again".format(delay))
        self.timer = Timer(self.scrape_interval_seconds, self._queue_scout_songs_and_repeat)
        self.timer.start()

    def scout_songs_and_repeat(self):
        last_scrape_at = time.time()
        try:
            songs = self.get_songs()
        except Exception as e:
            logger.exception("unable to scrape songs")
            songs = []
        for song in songs:
            self.librarian.notify_song_scouted(song['artist'], song['title'], self.SCOUTED_BY_NAME)
        self._schedule_scout_songs_and_repeat(last_scrape_at)

    def get_songs(self):
        logger.info("scouting songs at %s", self.recent_playlist_url)
        r = self.session.get(self.recent_playlist_url)
        return self.extract_songs(r.content)

    def extract_songs(self, content):
        soup = BeautifulSoup(content)
        song_like_links = soup.find_all('a', class_ = 'lrpstd')
        songs = []
        for song_like_link in song_like_links:
            songs.append({
                'title' : song_like_link['data-sngname'],
                'artist' : song_like_link['data-artistname']
            })
        logger.info("scouted %s songs at %s", len(songs), self.recent_playlist_url)
        return songs
