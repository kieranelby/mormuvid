import logging
import requests
import re
from urlparse import urljoin

import pykka
import pykka.gevent
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

class FinderActor(pykka.gevent.GeventActor):
    """
    Given the name of a popular song, finds a URL where its music video can be watched.
    This implementation merely searches on YouTube and picks the first result.
    """

    query_base_url = "https://www.youtube.com/results"

    def __init__(self, librarian):
        super(FinderActor, self).__init__()
        self.session = requests.Session()
        self.librarian = librarian

    def find(self, song):
        logger.info("looking for music video of %s", song)
        try:
            video_watch_url = self.get_video_watch_url(song)
        except Exception as e:
            logger.exception("could not find music video for %s", song)
            self.librarian.notify_song_not_found(song)
            return
        self.librarian.notify_song_found(song, video_watch_url)

    def get_video_watch_url(self, song):
        (search_result_url, search_result_content) = self.perform_search(song)
        return self.extract_video_watch_url(song, search_result_url, search_result_content)
    
    def perform_search(self, song):
        query_string = song.artist + " - " + song.title
        req_params = { 'search_query' : query_string }
        r = self.session.get(self.query_base_url, params = req_params)
        return (r.url, r.content)

    def extract_video_watch_url(self, song, search_result_url, search_result_content):
        soup = BeautifulSoup(search_result_content)
        thumbnail_div = soup.find("div", class_ = "yt-lockup-thumbnail")
        watch_link = thumbnail_div.find("a", href = re.compile("/watch"))
        maybe_rel_watch_url = watch_link['href']
        abs_watch_url = urljoin(search_result_url, maybe_rel_watch_url)
        logger.info("found probable music video of %s at %s", song, abs_watch_url)
        return abs_watch_url 
