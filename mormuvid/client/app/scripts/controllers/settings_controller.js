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
