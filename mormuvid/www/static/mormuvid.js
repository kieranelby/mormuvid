window.Mormuvid = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {},
    start: function() {
        var songs = new Mormuvid.Collections.Songs();
        var router = new Mormuvid.Router();
        router.on('route:home', function() {
            router.navigate('songs', {
                trigger: true,
                replace: true
            });
        });
        router.on('route:showSongs', function() {
            var songsView = new Mormuvid.Views.Songs({
                collection: songs
            });
            $('.main-container').html(songsView.render().$el);
        });
        Backbone.history.start();
    },
};

Mormuvid.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'songs': 'showSongs'
    }
});

Mormuvid.Models.Song = Backbone.Model.extend({
});

Mormuvid.Collections.Songs = Backbone.Collection.extend({
    model: Mormuvid.Models.Song,
    url: '/api/songs'
});

Mormuvid.Views.Song = Backbone.View.extend({
    template: null, // will be lazy-loaded
    initialize: function() {
        this.template = _.template($('#tpl-song').html());
    },
    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    }
});

Mormuvid.Views.Songs = Backbone.View.extend({
    tagName: 'div',
    template: null, // will be lazy-loaded
    events: {
        'click #btnRefreshSongs': 'refreshSongsClicked'
    },
    initialize: function() {
        this.template = _.template($('#tpl-songs').html());
        this.listenTo(this.collection, 'reset add change remove', this.render, this);
        this.collection.fetch();
    },
    renderOne: function(song) {
        var itemView = new Mormuvid.Views.Song({model: song});
        this.$('.songs-container').append(itemView.render().$el);
    },
    render: function() {
        var html = this.template();
        this.$el.html(html);
        this.collection.each(this.renderOne, this);
        return this;
    },
    refreshSongsClicked : function() {
        this.collection.fetch();
    }
});
