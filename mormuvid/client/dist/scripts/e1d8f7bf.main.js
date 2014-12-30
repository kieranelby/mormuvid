(function() {

/* TODO - find right place to put this "woof" stuff ... */
Ember.Application.initializer({
  name: "registerWoofMessages",
  initialize: function(container, application) {
    application.register('woof:main', Ember.Woof);
  }
});

Ember.Woof = Ember.ArrayProxy.extend({
  content: Ember.A(),
  timeout: 5000,
  pushObject: function(object) {
    object.typeClass = 'alert-' + object.type;
    this._super(object);
  },
  danger: function(message) {
    this.pushObject({
      type: 'danger',
      message: message
    });
  },
  warning: function(message) {
    this.pushObject({
      type: 'warning',
      message: message
    });
  },
  info: function(message) {
    this.pushObject({
      type: 'info',
      message: message
    });
  },
  success: function(message) {
    this.pushObject({
      type: 'success',
      message: message
    });
  }
});

Ember.Application.initializer({
  name: "injectWoofMessages",
  initialize: function(container, application) {
    application.inject('controller', 'woof', 'woof:main');
    application.inject('component',  'woof', 'woof:main');
    application.inject('route',      'woof', 'woof:main');
  }
});

var App = window.App = Ember.Application.create({
  LOG_TRANSITIONS: true, 
  LOG_TRANSITIONS_INTERNAL: true    
});

/* Order and include as you please. */


})();

(function() {

App.SongController = Ember.ObjectController.extend({
});

App.SongDeleteController = Ember.ObjectController.extend({
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


})();

(function() {

App.VideosController = Ember.ObjectController.extend({

  videoURL: null,

  actions: {
    downloadVideo: function () {

        var videoURL = this.get('videoURL');

        // TODO - validate

        var video = this.store.createRecord('video', {
            videoURL: videoURL
        });

        // Save the new model
        video.save();

        this.set('videoURL', '');

        this.woof.success("Video at " + videoURL + " has been queued for download.");
    }
  }

});


})();

(function() {

App.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api',
});

})();

(function() {

App.Song = DS.Model.extend({
    artist: DS.attr('string'),
    title: DS.attr('string'),
    status: DS.attr('string'),
    videoURL: DS.attr('string')
});


})();

(function() {

App.Video = DS.Model.extend({
    videoURL: DS.attr('string')
});


})();

(function() {

App.ApplicationRoute = Ember.Route.extend({
});


})();

(function() {

App.LoadingRoute = Ember.Route.extend({
});


})();

(function() {

App.SongRoute = Ember.Route.extend({
    model: function(params) {
        return this.get('store').find('song', params.song_id);
    }
});


})();

(function() {

App.SongsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.get('store').findAll('song');
    }
});

})();

(function() {

App.XWoofMessageComponent = Ember.Component.extend({
  classNames: ['x-woof-message-container'],
  classNameBindings: ['insertState'],
  insertState: 'pre-insert',
  didInsertElement: function() {
    var self = this;
    Ember.run.later(function() {
      self.set('insertState', 'inserted');
    }, 250);
    if (self.woof.timeout) {
      Ember.run.later(function() {
        self.destroy();
      }, self.woof.timeout);
    }
  },

  destroy : function() {
    this.set('insertState', 'destroyed');
    var self = this;
    Ember.run.later(function() {
      self.postDestroy();
    }, 500);
  },

  postDestroy : function() {
    this.woof.removeObject(this.get('message'));
  },

  click: function() {
    this.destroy();
  }
});

})();

(function() {

App.XWoofComponent = Ember.Component.extend({
  classNames: 'woof-messages',
  messages: Ember.computed.alias('woof')
});


})();

(function() {

App.SongView = Ember.View.extend({
});


})();

(function() {

App.SongsView = Ember.View.extend({
});


})();

(function() {

App.Router.map(function () {
    this.resource('songs', function() {
        this.route('new');
        this.resource('song', { path: '/:song_id' }, function() {
            this.route('edit');
            this.route('delete');
        });
    });
    this.resource('videos');
    this.resource('settings');
});


})();