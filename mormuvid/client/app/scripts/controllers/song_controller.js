App.SongController = Ember.ObjectController.extend({
});

App.SongEditController = Ember.ObjectController.extend({
  actions: {
    updateSong: function () {
        var self = this;
        this.get('model').save().then(
            function(song) {
                self.woof.success("Song updated.");
                self.transitionToRoute('song', song);
            },
            function(song) {
                self.woof.warning("Could not update song.");
                self.get('model').reload()
            }
        );
    }
  }
});

App.SongDeleteController = Ember.ObjectController.extend({
  doNotDownloadSameSong: true,
  doNotDownloadSameArtist: false,
  actions: {
    deleteSong: function () {

        var artist = this.get('model.artist');
        var title = this.get('model.title');

        var doNotDownloadSameSong = this.get('doNotDownloadSameSong');
        var doNotDownloadSameArtist = this.get('doNotDownloadSameArtist');

        if (doNotDownloadSameSong || doNotDownloadSameArtist) {
            var banTitle;
            if (doNotDownloadSameArtist) {
                banTitle = null;
            } else {
                banTitle = title;
            }
            var ban = this.store.createRecord('ban', {
                artist: artist,
                title: banTitle
            });
            ban.save();
        }

        var self = this;
        this.get('model').destroyRecord().then(
            function () {
                self.woof.success("Song deleted.");
                self.transitionToRoute('songs');
            }
        );
    }
  }
});
