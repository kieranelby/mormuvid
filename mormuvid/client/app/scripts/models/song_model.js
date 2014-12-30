App.Song = DS.Model.extend({
    artist: DS.attr('string'),
    title: DS.attr('string'),
    status: DS.attr('string'),
    videoURL: DS.attr('string')
});
