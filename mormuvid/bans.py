import logging
import sqlite3
import os
import uuid
from appdirs import user_config_dir

APPNAME = 'mormuvid'
DB_FILENAME = 'bansdb'
ALL_TITLES_MARKER = '__ALL__'

logger = logging.getLogger(__name__)

def enable_test_profile():
    global DB_FILENAME
    DB_FILENAME = 'test-bansdb'

def is_banned(artist, title):
    ban = _find_exact_ban(artist, title)
    if ban is not None:
        return True
    ban = _find_exact_ban(artist, ALL_TITLES_MARKER)
    if ban is not None:
        return True
    return False

def _extract_ban_from_row(row):
    ban = {'id': row[0], 'artist': row[1], 'title': row[2]}
    if ban['title'] == ALL_TITLES_MARKER:
        ban['title'] = None
    return ban

def get_bans():
    db = _get_db()
    bans = []
    try:
        cursor = db.cursor()
        for row in cursor.execute('''
            SELECT
              id,
              artist,
              title
            FROM
              ban b
            ORDER BY
              artist,
              title
        '''):
            ban = _extract_ban_from_row(row)
            bans.append(ban)
        return bans
    finally:
        db.close()

def add_ban(artist, title=None):
    db = _connect_db()
    ban_id = uuid.uuid4().hex
    logger.info("adding ban #%s on %s - %s", ban_id, artist, title)
    if title is None:
        title = ALL_TITLES_MARKER
    # TODO - time-of-check-to-time-of-use bug here
    # (someone else could add ban after our call to find_ban ...)
    ban = _find_exact_ban(artist, title)
    if ban is not None:
        return ban
    try:
        cursor = db.cursor()
        cursor.execute('''
            INSERT INTO ban
            (id, artist, title)
            VALUES
            (?, ?, ?)
        ''', (ban_id, artist, title))
        db.commit()
        logger.info("added ban on %s - %s", artist, title)
        return _find_exact_ban(artist, title)
    finally:
        db.close()

def _find_exact_ban(artist, title):
    db = _get_db()
    try:
        cursor = db.cursor()
        cursor.execute('''
            SELECT
              id,
              artist,
              title
            FROM
              ban b
            WHERE
              b.artist = ?
              AND b.title = ?
        ''', (artist, title))
        row = cursor.fetchone()
        if row is None:
            return None
        else:
            ban = _extract_ban_from_row(row)
            return ban
    finally:
        db.close()

def get_ban(ban_id):
    db = _get_db()
    try:
        cursor = db.cursor()
        cursor.execute('''
            SELECT
              id,
              artist,
              title
            FROM
              ban b
            WHERE
              b.id = ?
        ''', (ban_id,))
        row = cursor.fetchone()
        ban = _extract_ban_from_row(row)
        return ban
    finally:
        db.close()

def remove_ban(ban_id):
    db = _get_db()
    try:
        cursor = db.cursor()
        cursor.execute('''
            DELETE FROM
              ban
            WHERE
              id = ?
        ''', (ban_id,))
        db.commit()
    finally:
        db.close()

def remove_all_bans():
    db = _get_db()
    try:
        cursor = db.cursor()
        cursor.execute('''
            DELETE FROM ban
        ''')
        db.commit()
    finally:
        db.close()

def _get_db():
    db = _connect_db()
    _create_tables_if_needed(db)
    return db

def _connect_db():
    logger.info("connecting to bans db")
    db_dir = user_config_dir(appname=APPNAME)
    logger.info("ensuring bans db dir %s exists", db_dir)
    try:
        os.makedirs(db_dir)
    except OSError:
        if os.path.exists(db_dir):
            pass
        else:
            raise
    db_file = os.path.join(db_dir, DB_FILENAME)
    logger.info("connecting to bans db file %s", db_file)
    the_db = sqlite3.connect(db_file)
    logger.info("connected to bans db")
    return the_db

def _create_tables_if_needed(db):
    try:
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS ban (
                id CHAR(32) NOT NULL PRIMARY KEY,
                artist VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                added_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT c_ban_uniq_song UNIQUE (artist, title)
            )
        ''')
        db.commit()
    except:
        db.close()
        raise

