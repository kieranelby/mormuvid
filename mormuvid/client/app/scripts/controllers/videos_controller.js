App.VideosController = Ember.ObjectController.extend({

  videoURL: null,

  actions: {
    downloadVideo: function () {

        var videoURL = this.get('videoURL');

        // TODO - validate

        var video = this.store.createRecord('video', {
            videoURL: videoURL
        });

        // Save the new model
        video.save();

        this.set('videoURL', '');

        this.woof.success("Video at " + videoURL + " has been queued for download.");
    }
  }

});
