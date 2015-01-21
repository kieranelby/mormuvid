import unittest

from mormuvid import bans

class MyTest(unittest.TestCase):

    def setUp(self):
        bans.enable_test_profile()
        bans.remove_all_bans()
        self.exampleArtist = "Robin Thicke"
        self.exampleTitle = "Blurred Lines"
        self.neverBannedArtist = "Kylie"
        self.neverBannedTitle = "Cant get you outta my head"

    def testBanSongDoesNotBlowUp(self):
        bans.add_ban(self.exampleArtist, self.exampleTitle)

    def testBanSongReturnsBanDict(self):
        ban = bans.add_ban(self.exampleArtist, self.exampleTitle)
        self.assertIn('title', ban)
        self.assertEqual(self.exampleTitle, ban['title'])
        self.assertIn('artist', ban)
        self.assertEqual(self.exampleArtist, ban['artist'])
        self.assertIn('id', ban)
        self.assertIsNotNone(ban['id'])

    def testSongsAreNotInitiallyBanned(self):
        self.assertEqual(False,
          bans.is_banned(self.neverBannedArtist, self.neverBannedTitle))

    def testBanSongCausesSongIsBanned(self):
        bans.add_ban(self.exampleArtist, self.exampleTitle)
        self.assertEqual(True,
          bans.is_banned(self.exampleArtist, self.exampleTitle))

    def testBanSongDoesNotCauseOtherSongIsBanned(self):
        bans.add_ban(self.exampleArtist, self.exampleTitle)
        self.assertEqual(False,
          bans.is_banned(self.exampleArtist, self.neverBannedTitle))

    def testBanSongAgainReturnsSameBan(self):
        ban1 = bans.add_ban(self.exampleArtist, self.exampleTitle)
        ban2 = bans.add_ban(self.exampleArtist, self.exampleTitle)
        self.assertEqual(ban1['id'], ban2['id'])

    def testBanSongAndGetById(self):
        ban1 = bans.add_ban(self.exampleArtist, self.exampleTitle)
        ban2 = bans.get_ban(ban1['id'])
        self.assertEqual(ban1['id'], ban2['id'])
        self.assertEqual(ban1['artist'], ban2['artist'])
        self.assertEqual(ban1['title'], ban2['title'])

    def testRemoveSongBan(self):
        ban = bans.add_ban(self.exampleArtist, self.exampleTitle)
        bans.remove_ban(ban['id'])
        self.assertEqual(False,
          bans.is_banned(self.exampleArtist, self.exampleTitle))

    def testBanArtistReturnsBanDict(self):
        ban = bans.add_ban(self.exampleArtist, None)
        self.assertIn('artist', ban)
        self.assertEqual(self.exampleArtist, ban['artist'])
        self.assertIn('title', ban)
        self.assertIsNone(ban['title'])
        self.assertIn('id', ban)
        self.assertIsNotNone(ban['id'])

    def testBanArtistCausesTheirSongIsBanned(self):
        bans.add_ban(self.exampleArtist, None)
        self.assertEqual(True,
          bans.is_banned(self.exampleArtist, self.exampleTitle))

    def testBanArtistDoesNotCauseOtherArtistSongIsBanned(self):
            bans.add_ban(self.exampleArtist, None)
            self.assertEqual(False,
              bans.is_banned(self.neverBannedArtist, self.neverBannedTitle))
