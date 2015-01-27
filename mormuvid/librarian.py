import codecs
import collections
import glob
import json
import logging
import os
import re

from os import path
from os import makedirs
from time import time

import pykka

from mormuvid import bans
from mormuvid.settings import add_observer, get_settings
from mormuvid.finder import FinderActor
from mormuvid.downloader import DownloaderActor
from mormuvid.song import Song
from mormuvid.notifications import broadcast_notification

logger = logging.getLogger(__name__)

class Librarian:
    """
    Keeps track of which songs have been downloaded (or are downloading) and decides where to store them.
    This implementation generates XBMC/Kodi style .nfo files for successfully downloaded songs.
    It writes .lock files for songs that are in progress / failed / banned.
    """

    max_queued_songs = 5

    def __init__(self):
        add_observer(self)
        self.settings_updated(get_settings())
        self.cached_songs = None

    def settings_updated(self, settings):
        self.scouted_daily_quota = settings['scoutedDailyQuota']

    def _get_songs_dir(self):
        home = path.expanduser("~")
        songs_dir = path.join(home, "Videos", "MusicVideos")
        if not path.isdir(songs_dir):
            logger.info("creating new songs_dir at %s", songs_dir)
            makedirs(songs_dir)
        return songs_dir 

    def get_others_dir(self):
        home = path.expanduser("~")
        others_dir = path.join(home, "Videos", "Others")
        if not path.isdir(others_dir):
            logger.info("creating new others_dir at %s", others_dir)
            makedirs(others_dir)
        return others_dir

    def get_base_filepath(self, song):
        return path.join(self._get_songs_dir(), song.get_base_file_name_wo_ext())

    def _is_download_wanted(self, possible_new_song):
        if self._too_many_songs_queued():
            logger.info("don't want song %s right now since too many songs already queued up", possible_new_song)
            return False
        if self._daily_quota_reached():
            logger.info("don't want song %s right now since reached daily quota", possible_new_song)
            return False
        existing_song = self.check_for_duplicate(possible_new_song)
        if existing_song is not None:
            logger.info("don't want song %s since probably same as song %s", possible_new_song, existing_song)
            return False
        if self.is_banned(possible_new_song):
            logger.info("don't want song %s since it is banned", possible_new_song)
            return False
        return True

    def get_song_by_id(self, song_id):
        songs = self.get_songs()
        for song in songs:
            if song.id == song_id:
                return song
        return None

    def check_for_duplicate(self, song):
        songs = self.get_songs()
        for existing_song in songs:
            if existing_song.id == song.id:
                return existing_song
            if existing_song.artist == song.artist and existing_song.title == song.title:
                return existing_song
        return None

    def is_banned(self, song):
        return bans.is_banned(song.artist, song.title)

    def delete(self, song):
        base_filepath_wo_ext = self.get_base_filepath(song)
        for filepath in glob.iglob(base_filepath_wo_ext + ".*"):
            if (os.path.splitext(filepath)[0] == base_filepath_wo_ext):
                logger.info("deleting file %s which belonged to song %s", filepath, song)
                os.remove(filepath)
        self.songs_cache_delete(song)

    def get_songs(self):
        if self.cached_songs is None:
            self.songs_cache_refresh()
        return self.cached_songs.values()

    def songs_cache_refresh(self):
        videos_dir = self._get_songs_dir()
        self.cached_songs = {}
        for nfo_filepath in glob.iglob(path.join(videos_dir,'*.nfo')):
            self._read_nfo_file(nfo_filepath)
        for lock_filepath in glob.iglob(path.join(videos_dir,'*.lock')):
            self._read_lock_file(lock_filepath)

    def songs_cache_put(self, song):
        if self.cached_songs is None:
            return
        self.cached_songs[song.id] = song
        logger.info("updated song %s in song cache", song)

    def songs_cache_delete(self, song):
        try:
            del self.cached_songs[song.id]
        except Exception as e:
            logger.info("failed to delete song %s from song cache due to %s", song, e)
            pass
        logger.info("removed song %s from song cache", song)

    def _get_finder(self):
        refs = pykka.ActorRegistry.get_by_class(FinderActor)
        return refs[0].proxy()

    def _get_downloader(self):
        refs = pykka.ActorRegistry.get_by_class(DownloaderActor)
        return refs[0].proxy()

    def update_existing_song(self, song_id, artist, title):
        song = self.get_song_by_id(song_id)
        if song is None:
            return None
        song.artist = artist
        song.title = title
        self._persist_song(song)
        return song

    def notify_song_requested(self, artist, title, video_watch_url=None):
        song = Song(artist, title)
        if video_watch_url is None or not video_watch_url.strip():
            logger.info("finding manually requested song {}".format(song))
            self._notify_find_queued(song)
            self._get_finder().find(song)
        else:
            logger.info("downloading manually requested song {} from {}".format(song, video_watch_url))
            song = Song(artist, title)
            self.notify_song_found(song, video_watch_url)
        return song

    def notify_song_scouted(self, artist, title, scouted_by):
        song = Song(artist, title, scouted_by=scouted_by)
        wanted = self._is_download_wanted(song)
        if wanted:
            self._notify_find_queued(song)
            self._get_finder().find(song)
        else:
            logger.info("don't currently want/need song {}".format(song))
        return

    def _notify_find_queued(self, song):
        song.mark_find_queued()
        self._persist_song(song)
        return

    def notify_song_found(self, song, video_watch_url):
        logger.info("queueing download of {}".format(song))
        song.mark_found(video_watch_url)
        self._notify_download_queued(song)
        self._get_downloader().download_song(song)
        return

    def notify_song_not_found(self, song):
        song.mark_failed()
        self._persist_song(song)
        return

    def _notify_download_queued(self, song):
        song.mark_download_queued()
        self._persist_song(song)
        broadcast_notification("queueing download of %s" % song)
        return

    def notify_download_failed(self, song):
        song.mark_failed()
        self._persist_song(song)
        return

    def notify_download_completed(self, song):
        song.mark_downloaded()
        self._persist_song(song)
        broadcast_notification("downloaded %s" % song)
        return

    def notify_download_cancelled(self, song):
        self._delete_lock_file(song)
        self.songs_cache_delete(song)
        return

    def request_other_video(self, video_url):
        video = {
            'videoURL': video_url
        }
        self._get_downloader().download_other_video(video)
        return video

    def _remove_path_and_ext(self, filepath):
        return os.path.splitext(os.path.basename(filepath))[0]

    def _get_nfo_filepath(self, song):
        return self.get_base_filepath(song) + '.nfo'

    def _persist_song(self, song):
        if song.status == 'COMPLETED':
            self._write_nfo_file(song)
            try:
                self._delete_lock_file(song)
            except OSError:
                pass
        else:
            self._write_lock_file(song)
        self.songs_cache_put(song)

    def _write_nfo_file(self, song):
        nfo_filepath = self._get_nfo_filepath(song)
        nfo_xml = song.to_nfo_xml()
        with codecs.open(nfo_filepath, 'w', 'utf-8') as f:
            f.write(nfo_xml)
        return

    def _read_nfo_file(self, nfo_filepath):
        logger.info("reading nfo_file %s", nfo_filepath)
        try:
            with codecs.open(nfo_filepath, 'r', encoding='utf-8') as f:
                xml_content = f.read()
            song = Song.from_nfo_xml(xml_content, self._remove_path_and_ext(nfo_filepath))
            self.songs_cache_put(song)
            return song
        except:
            logger.info("failed to read nfo_file %s", nfo_filepath)
            return None

    def _get_lock_filepath(self, song):
        return self.get_base_filepath(song) + '.lock'

    def _write_lock_file(self, song):
        lock_filepath = self._get_lock_filepath(song)
        nfo_xml = song.to_nfo_xml()
        with codecs.open(lock_filepath, 'w', 'utf-8') as f:
            f.write(nfo_xml)
        return

    def _read_lock_file(self, lock_filepath):
        logger.info("reading lock_file %s", lock_filepath)
        try:
            with codecs.open(lock_filepath, 'r', encoding='utf-8') as f:
                xml_content = f.read()
            song = Song.from_nfo_xml(xml_content, self._remove_path_and_ext(lock_filepath))
        except:
            logger.info("failed to read lock_file %s", lock_filepath)
            return None
        if song.is_stale():
            logger.info("removing lock file for stale song %s (status %s)", song, song.status)
            self.songs_cache_delete(song)
            os.remove(lock_filepath)
            return None
        self.songs_cache_put(song)
        return song

    def _delete_lock_file(self, song):
        lock_filepath = self._get_lock_filepath(song)
        os.remove(lock_filepath)

    def _too_many_songs_queued(self):
        songs = self.get_songs()
        queued_songs = [song for song in songs if song.is_queued()]
        return len(queued_songs) > self.max_queued_songs

    def _daily_quota_reached(self):
        songs = self.get_songs()
        seconds_in_a_day = 24 * 60 * 60
        cutoff_time = time() - seconds_in_a_day
        scouted_songs_downloaded_today = \
          [song for song in songs if
             song.status == "COMPLETED" and
             song.scouted_by is not None and
             song.updated_at > cutoff_time]
        num_scouted_songs_downloaded_today = len(scouted_songs_downloaded_today)
        logger.info("have downloaded %s scouted songs in last 24 hours vs quota of %s",
          num_scouted_songs_downloaded_today, self.scouted_daily_quota)
        return num_scouted_songs_downloaded_today > self.scouted_daily_quota

    def _clean_up_lock_files(self):
        logger.info("cleaning up lock files")
        videos_dir = self._get_songs_dir()
        for lock_filepath in glob.iglob(path.join(videos_dir,'*.lock')):
            # will clean up stale ones as a side-effect
            song = self._read_lock_file(lock_filepath)

    def _requeue_previosuly_queued_files(self):
        logger.info("re-queue-ing previously queued files")
        songs = self.get_songs()
        for song in songs:
            if song.status == 'FIND_QUEUED':
                logger.info("re-queue-ing song %s for finding", song)
                self._get_finder().find(song)
            elif song.status == 'DOWNLOAD_QUEUED':
                logger.info("re-queue-ing song %s for download", song)
                self._get_downloader().download_song(song)

    def start(self):
        logger.info("videos_dir is %s", self._get_songs_dir())
        self._clean_up_lock_files()
        self._requeue_previosuly_queued_files()
