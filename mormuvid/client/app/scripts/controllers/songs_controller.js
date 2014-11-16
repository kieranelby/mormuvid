Client.SongsController = Ember.ObjectController.extend({
});

Client.SongsIndexController = Ember.ArrayController.extend({
  sortProperties: ['artist', 'title'],
  sortAscending: true,
  actions: {
    clickSong: function (song) {
        this.transitionToRoute('song', song);
    }
  }
});

Client.SongsNewController = Ember.ObjectController.extend({
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
            status: 'NEW'
        });

        // Save the new model
        song.save();

        // TODO - go somewhere
    }
  }
});
