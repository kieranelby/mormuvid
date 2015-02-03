(function() {

var App = window.App = Ember.Application.create({
  LOG_TRANSITIONS: true, 
  LOG_TRANSITIONS_INTERNAL: true    
});

/* Order and include as you please. */


})();

(function() {

App.BansController = Ember.ArrayController.extend({
  // hmm, this seems to be suprisingly fiddly to get working reliably ...
  noBansFound: function () {
    var items = this.get('content');
    var numItems = items.get('length');
    return numItems < 1;
  }.property('content.length'),
  actions: {
    liftBan: function (ban) {
        var self = this;
        this.store.find('ban', ban.id).then(
            function (banRecord) {
                banRecord.destroyRecord().then(
                    function(ban) {
                        self.woof.success("Ban lifted.");
                        self.transitionToRoute('bans');
                    },
                    function(ban) {
                        self.woof.warning("Failed to lift ban (destroyRecord failed).");
                        self.transitionToRoute('bans');
                    }
                );
            },
            function() {
                self.woof.warning("Failed to lift ban (record not found).");
                self.transitionToRoute('bans');
            }
        );
    }
  }
});


})();

(function() {

App.SettingsController = Ember.ObjectController.extend({
  actions: {
    save: function () {
        var self = this;
        this.get('model').save().then(
            function(settings) {
                self.woof.success("Settings saved.");
            },
            function(settings) {
                self.woof.warning("Failed to save settings.");
                // not working quite right ...
                self.get('model').reload()
            }
        );
    }
  }
});


})();

(function() {

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


Ember.Inflector.inflector.uncountable('settings');

App.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api',
    ajaxError: function(jqXHR) {
        var error = this._super(jqXHR);
        if (jqXHR && jqXHR.status === 422) {
            var jsonErrors = Ember.$.parseJSON(jqXHR.responseText);
            return new DS.InvalidError(jsonErrors);
        } else {
            return error;
        }
    }
});

})();

(function() {

App.Ban = DS.Model.extend({
    artist: DS.attr('string'),
    title: DS.attr('string')
});


})();

(function() {

App.Settings = DS.Model.extend({
    scoutedDailyQuota: DS.attr('number')
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

App.BansRoute = Ember.Route.extend({
    model: function() {
        return this.get('store').findAll('ban');
    }
});

})();

(function() {

App.LoadingRoute = Ember.Route.extend({
});


})();

(function() {

App.SettingsRoute = Ember.Route.extend({
    model: function() {
        var dummyId = 1;
        return this.get('store').find('settings', dummyId);
    }
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

Ember.Application.initializer({
  name: "registerWoofMessages",
  initialize: function(container, application) {
    application.register('woof:main', Ember.Woof);
  }
});

Ember.Woof = Ember.ArrayProxy.extend({
  content: Ember.A(),
  timeout: 10 * 1000,
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
//    application.inject('listenForNotifications', 'woof', 'woof:main');
  }
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
    this.resource('bans');
    this.resource('videos');
    this.resource('settings');
});


})();

(function() {

Ember.Application.initializer({
  name: "fixBoostrapHamburgerMenu",
  initialize: function(container, application) {
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) ) {
            $(this).collapse('hide');
        }
    });
  }
});


})();

(function() {

Ember.Application.initializer({
  name: "listenForNotifications",
  initialize: function(container, application) {
    var woof = container.lookup('woof:main');
    var ws_notification_url = "ws://" + location.host + "/notifications";
    var ws = new RcSocket(ws_notification_url);
    var sendPing = function() {
      ws.send("ping");
    }
    ws.onopen = function() {
      sendPing();
    };
    ws.onmessage = function (evt) {
        console.log(evt.data);
        msgObj = JSON.parse(evt.data);
        if ('notification' in msgObj) {
          var notification = msgObj.notification;
          woof.info(notification);
        }
    };
    window.setInterval(sendPing, 15 * 1000);
  }
});


})();