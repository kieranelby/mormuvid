Client.SongsIndexRoute = Ember.Route.extend({
    //model: function() {
    //    return this.get('store').findAll('song');
    //}
    setupController: function(controller) {
        controller.set('model', this.get('store').findAll('song'));
    }
});