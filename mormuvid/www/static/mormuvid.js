$(function() {

window.Mormuvid = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {},
    start: function() {
        var songs = new Mormuvid.Collections.Songs();
        var songsView = new Backbone.CollectionView({
          el : $( "table#main-songs-table" ),
          selectable : true,
          collection : songs,
          modelView : Mormuvid.Views.Song
        });
        var router = new Mormuvid.Router();
        router.on('route:home', function() {
            router.navigate('songs', {
                trigger: true,
                replace: true
            });
        });
        router.on('route:showSongs', function() {
            songsView.render();
            songs.fetch();
        });
        Backbone.history.start();
    }
};

Mormuvid.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'songs': 'showSongs'
    }
});

Mormuvid.Models.Song = Backbone.Model.extend({
    defaults: {
        artist: 'UNKNOWN',
        title: 'UNKNOWN',
        status: 'UNKNOWN'
    }
});

Mormuvid.Collections.Songs = Backbone.Collection.extend({
    model: Mormuvid.Models.Song,
    url: '/api/songs'
});

Mormuvid.Views.Song = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#tpl-song').html()),
    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    }
});

Mormuvid.start();

});