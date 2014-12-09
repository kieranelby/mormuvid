Client.VideosController = Ember.ObjectController.extend({

  colours: ["red","yellow","blue"],
  currentColour: "red",

  availableCategories: [
    {name: "Documentary", id: "Documentaries"},
    {name: "Exercise", id: "Exercise"},
    {name: "Karaoke", id: "Karaoke"},
    {name: "Movie", id: "Movies"},
    {name: "TV Show", id: "TVShows"},
    {name: "Other", id: "Other"}
  ],

  categoryId: "Other",
  videoURL: null,

  actions: {
    downloadVideo: function () {

        var category = this.get('categoryId');
        var videoURL = this.get('videoURL');

        // TODO - validate

        var video = this.store.createRecord('video', {
            category: category,
            videoURL: videoURL
        });

        // Save the new model
        video.save();

        // TODO - go somewhere
    }
  }

});
