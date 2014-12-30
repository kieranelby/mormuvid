App.XWoofMessageComponent = Ember.Component.extend({
  classNames: ['x-woof-message-container'],
  classNameBindings: ['insertState'],
  insertState: 'pre-insert',
  didInsertElement: function() {
    var self = this;
    Ember.run.later(function() {
      self.set('insertState', 'inserted');
    }, 250);
    if (self.woof.timeout) {
      Ember.run.later(function() {
        self.destroy();
      }, self.woof.timeout);
    }
  },

  destroy : function() {
    this.set('insertState', 'destroyed');
    var self = this;
    Ember.run.later(function() {
      self.postDestroy();
    }, 500);
  },

  postDestroy : function() {
    this.woof.removeObject(this.get('message'));
  },

  click: function() {
    this.destroy();
  }
});