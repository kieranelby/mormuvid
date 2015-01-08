App.SettingsRoute = Ember.Route.extend({
    model: function() {
        var dummyId = 1;
        return this.get('store').find('settings', dummyId);
    }
});