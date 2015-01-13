import logging
import sqlite3
import os
from appdirs import user_config_dir

APPNAME = 'mormuvid'
DB_FILENAME = 'bansdb'

logger = logging.getLogger(__name__)

def is_banned(artist, title):
    db = _get_db()
    try:
        cursor = db.cursor()
        cursor.execute('''
            SELECT
              count(*) as num_bans
            FROM
              ban b
            WHERE
              b.artist = ?
              and (b.title is NULL or b.title = ?)
        ''', (artist, title))
        row = cursor.fetchone()
        num_bans = row[0]
        return num_bans > 0
    finally:
        db.close()

def add_ban(artist, title):
    db = _connect_db()
    logger.info("adding ban on %s - %s", artist, title)
    try:
        cursor = db.cursor()
        cursor.execute('''
            INSERT INTO ban
            (artist, title)
            VALUES
            (?, ?)
        ''', (artist, title))
        db.commit()
        logger.info("added ban on %s - %s", artist, title)
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
                id INTEGER PRIMARY KEY,
                artist VARCHAR(255) NOT NULL,
                title VARCHAR(255),
                added_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        db.commit()
    except:
        db.close()
        raise

