import logging
import sqlite3
import os
from appdirs import user_config_dir

APPNAME = 'mormuvid'
DB_FILENAME = 'settingsdb'

logger = logging.getLogger(__name__)
DUMMY_ID = 1

def get_settings():
    db = _get_db()
    try:
        cursor = db.cursor()
        cursor.execute('''
            SELECT
              id,
              scouted_daily_quota
            FROM
              settings
        ''')
        row = cursor.fetchone()
        settings = {
            'id' : row[0],
            'scoutedDailyQuota' : row[1]
        }
        return settings
    finally:
        db.close()

def update_settings(settings):
    global DUMMY_ID
    db = _get_db()
    logger.info("updating settings to %s", settings)
    try:
        cursor = db.cursor()
        cursor.execute('''
            UPDATE settings
            SET
              scouted_daily_quota = ?
            WHERE
              id = ?
        ''', (settings['scoutedDailyQuota'],DUMMY_ID))
        db.commit()
        logger.info("settings updated")
    finally:
        db.close()

def _get_db():
    db = _connect_db()
    _create_tables_if_needed(db)
    return db

def _connect_db():
    global logger
    logger.info("connecting to settings db")
    db_dir = user_config_dir(appname=APPNAME)
    logger.info("ensuring settings db dir %s exists", db_dir)
    try:
        os.makedirs(db_dir)
    except OSError:
        if os.path.exists(db_dir):
            pass
        else:
            raise
    db_file = os.path.join(db_dir, DB_FILENAME)
    logger.info("connecting to settings db file %s", db_file)
    the_db = sqlite3.connect(db_file)
    logger.info("connected to settings db")
    return the_db

def _create_tables_if_needed(db):
    global DUMMY_ID
    try:
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS settings (
                id INTEGER NOT NULL PRIMARY KEY,
                scouted_daily_quota INTEGER NOT NULL DEFAULT 12
            )
        ''')
        cursor.execute('''
            INSERT OR IGNORE INTO settings (id) VALUES (?)
        ''', (DUMMY_ID,))
        db.commit()
    except:
        db.close()
        raise

