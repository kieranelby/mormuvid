(function() {

var Client = window.Client = Ember.Application.create();

/* Order and include as you please. */


})();

(function() {

Client.SongController = Ember.ObjectController.extend({
  actions: {
    test: function () {
        alert("blurrgg");
    }
  }
});


})();

(function() {

Client.SongsIndexController = Ember.ArrayController.extend({
  sortProperties: ['artist', 'title'],
  sortAscending: true,
  actions: {
    test: function (song) {
        this.transitionToRoute('song', song);
    }
  }
});


})();

(function() {

Client.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api',
});

})();

(function() {

Client.Song = DS.Model.extend({
    artist: DS.attr('string'),
    title: DS.attr('string'),
    status: DS.attr('string')
});


})();

(function() {

Client.ApplicationRoute = Ember.Route.extend({
});


})();

(function() {

Client.LoadingRoute = Ember.Route.extend({
});


})();

(function() {

Client.SongRoute = Ember.Route.extend({
    model: function(params) {
        return this.get('store').find('song', params.song_id);
    }
});


})();

(function() {

Client.SongsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.get('store').findAll('song');
    }
    /*
    setupController: function(controller) {
        controller.set('model', this.get('store').findAll('song'));
    }
    */
});

})();

(function() {

Client.SongView = Ember.View.extend({
});


})();

(function() {

Client.SongsView = Ember.View.extend({
});


})();

(function() {

Client.Router.map(function () {
    this.resource('songs', function() {
        this.route('new');
        this.resource('song', { path: '/:song_id' }, function() {
            this.route('edit');
            this.route('delete');
        });
    });
    this.resource('otherVideos');
    this.resource('settings');
});


})();