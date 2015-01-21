import unittest

from time import time
from mormuvid.song import Song

class MyTest(unittest.TestCase):

    def setUp(self):
        self.exampleArtist = "2NE1"
        self.exampleTitle = "I Am The Best"
        self.exampleVideoUrl = "http://www.youtube.com/watch?v=j7_lSP8Vc3o"

    def getExampleScoutedSong(self):
        return Song(self.exampleArtist, self.exampleTitle)

    def testCreateSongFromNonMormuvidXml(self):
        kodi_example_xml = """
        <musicvideo>
        <title>Bestsongintheworld</title>
        <artist>Bestartistintheworld</artist>
        <album>Me</album>
        <genre>Pop</genre>
        <runtime>3:20</runtime>
        <plot>Scantly clad women hoing about</plot>
        <year>2000</year>
        <director>and I</director>
        <studio>Ego prod.</studio>
        <track>1</track>
        </musicvideo>
        """
        song = Song.from_nfo_xml(kodi_example_xml)
        self.assertEqual("COMPLETED", song.status)
        self.assertEqual("Bestartistintheworld", song.artist)
        self.assertEqual("Bestsongintheworld", song.title)
        self.assertEqual(song.video_watch_url, None)


    def testMarkFoundThenWriteAndReadBack(self):
        # Given an example scouted song
        song = self.getExampleScoutedSong()
        # When we mark it as found
        song.mark_found(self.exampleVideoUrl)
        # And write it to XML and read it back again
        base_file_name_wo_ext = song.get_base_file_name_wo_ext()
        xml = song.to_nfo_xml()
        print xml
        read_back_song = Song.from_nfo_xml(xml, base_file_name_wo_ext)
        # Then ...
        self.assertEqual("FOUND", read_back_song.status)
        self.assertEqual(song.artist, read_back_song.artist)
        self.assertEqual(song.title, read_back_song.title)
        self.assertEqual(song.video_watch_url, read_back_song.video_watch_url)

    def testMarkingSongChangesUpdateTime(self):
        # Given an example scouted song with a known update time in the past
        song = self.getExampleScoutedSong()
        original_updated_at = 12345
        song.updated_at = original_updated_at
        # When we mark it as found
        song.mark_found(self.exampleVideoUrl)
        # Then the update time changes
        self.assertTrue(song.updated_at > original_updated_at)

    def testRecentNonCompletedSongNotStale(self):
        # Given an example scouted song
        song = self.getExampleScoutedSong()
        # When we mark it as found right now
        song.mark_found(self.exampleVideoUrl)
        # Then it doesn't count as stale
        self.assertFalse(song.is_stale())

    def testOldNonCompletedSongNotStale(self):
        # Given an example scouted song
        song = self.getExampleScoutedSong()
        # When we mark it as found ages ago
        song.mark_found(self.exampleVideoUrl)
        song.updated_at = time() - 90 * 24 * 60 * 60
        # Then it is considered stale
        self.assertTrue(song.is_stale())
