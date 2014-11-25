Client.SongController = Ember.ObjectController.extend({
});

Client.SongDeleteController = Ember.ObjectController.extend({
  doNotDownloadSameSong: true,
  doNotDownloadSameArtist: false,
  actions: {
    deleteSong: function () {
        this.get('model').destroyRecord();
        this.transitionToRoute('songs');
    }
  }
});
