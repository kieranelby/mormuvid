Client.Router.map(function () {
  
    this.resource('songs', function() {
        this.resource('song', { path: '/:song_id' }, function() {
            this.route('edit');
        });
    });
  
});
