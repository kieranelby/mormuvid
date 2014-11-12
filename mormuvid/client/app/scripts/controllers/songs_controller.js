Client.SongsIndexController = Ember.ArrayController.extend({
  sortProperties: ['artist', 'title'],
  sortAscending: true,
  actions: {
    test: function () {
        alert("gahhh");
    }
  }
});
