
Ember.Inflector.inflector.uncountable('settings');

App.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api',
    ajaxError: function(jqXHR) {
        var error = this._super(jqXHR);
        if (jqXHR && jqXHR.status === 422) {
            var jsonErrors = Ember.$.parseJSON(jqXHR.responseText);
            return new DS.InvalidError(jsonErrors);
        } else {
            return error;
        }
    }
});