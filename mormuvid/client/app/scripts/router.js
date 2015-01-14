App.Router.map(function () {
    this.resource('songs', function() {
        this.route('new');
        this.resource('song', { path: '/:song_id' }, function() {
            this.route('edit');
            this.route('delete');
        });
    });
    this.resource('bans');
    this.resource('videos');
    this.resource('settings');
});
