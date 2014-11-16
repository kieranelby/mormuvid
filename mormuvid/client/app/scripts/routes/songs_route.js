Client.SongsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.get('store').findAll('song');
    }
});