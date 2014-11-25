(function() {

var Client = window.Client = Ember.Application.create({
  LOG_TRANSITIONS: true, 
  LOG_TRANSITIONS_INTERNAL: true    
});

/* Order and include as you please. */


})();

(function() {

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


})();

(function() {

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
            status: 'NEW',
            videoURL: videoURL
        });

        // Save the new model
        song.save();

        // TODO - go somewhere
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
    status: DS.attr('string'),
    videoURL: DS.attr('string')
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