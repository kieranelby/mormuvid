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
