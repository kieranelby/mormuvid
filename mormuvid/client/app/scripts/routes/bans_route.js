App.BansRoute = Ember.Route.extend({
    model: function() {
        return this.get('store').findAll('ban');
    }
});