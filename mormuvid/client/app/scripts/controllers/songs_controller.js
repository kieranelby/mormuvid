Client.SongsIndexController = Ember.ArrayController.extend({
  sortProperties: ['artist', 'title'],
  sortAscending: true,
  actions: {
    test: function (song) {
        this.transitionToRoute('song', song);
    }
  }
});
