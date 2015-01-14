App.BansRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('model', this.get('store').findAll('ban'))
    }
});