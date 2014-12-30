App.SongsController = Ember.ObjectController.extend({
});

App.SongsIndexController = Ember.ArrayController.extend({
  sortProperties: ['artist', 'title'],
  sortAscending: true,
  actions: {
    clickSong: function (song) {
        this.transitionToRoute('song', song);
    }
  }
});

App.SongsNewController = Ember.ObjectController.extend({
  artist: null,
  title: null,
  videoURL: null,
  actions: {
    addSong: function () {

        var artist = this.get('artist');
        var title = this.get('title');
        var videoURL = this.get('videoURL');

        // TODO - validate

        var song = this.store.createRecord('song', {
            artist: artist,
            title: title,
            status: 'NEW',
            videoURL: videoURL
        });

        // Save the new model
        song.save();

        this.set('artist', '');
        this.set('title', '');
        this.set('videoURL', '');

        this.woof.success("'" + title + "' has been queued for download.");
    }
  }
});
