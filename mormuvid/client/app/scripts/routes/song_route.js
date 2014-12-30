App.SongRoute = Ember.Route.extend({
    model: function(params) {
        return this.get('store').find('song', params.song_id);
    }
});
