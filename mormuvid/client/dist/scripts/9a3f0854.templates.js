Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                    <a href=\"#\"><span class=\"glyphicon glyphicon-home\"></span> &nbsp &nbsp Home</a>\n                ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n                    <a href=\"#\"><span class=\"glyphicon glyphicon-headphones\"></span> &nbsp &nbsp Songs</a>\n                ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                    <a href=\"#\"><span class=\"glyphicon glyphicon-facetime-video\"></span> &nbsp &nbsp Other Videos</a>\n                ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n                    <a href=\"#\"><span class=\"glyphicon glyphicon-cog\"></span> &nbsp &nbsp Settings</a>\n                ");
  }

  data.buffer.push("<div>\n	<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n		<div class=\"navbar-header\">\n			<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-ex1-collapse\">\n				<span class=\"sr-only\">Toggle navigation</span>\n				<span class=\"icon-bar\"></span>\n				<span class=\"icon-bar\"></span>\n				<span class=\"icon-bar\"></span>\n			</button>\n			<a class=\"navbar-brand\" href=\"#\">mormuvid</a>\n		</div>\n		<div class=\"collapse navbar-collapse navbar-ex1-collapse\">\n            <ul class=\"nav navbar-nav\">\n                ");
  hashContexts = {'tagName': depth0};
  hashTypes = {'tagName': "STRING"};
  options = {hash:{
    'tagName': ("li")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashContexts = {'tagName': depth0};
  hashTypes = {'tagName': "STRING"};
  options = {hash:{
    'tagName': ("li")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "songs", options) : helperMissing.call(depth0, "link-to", "songs", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashContexts = {'tagName': depth0};
  hashTypes = {'tagName': "STRING"};
  options = {hash:{
    'tagName': ("li")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "otherVideos", options) : helperMissing.call(depth0, "link-to", "otherVideos", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashContexts = {'tagName': depth0};
  hashTypes = {'tagName': "STRING"};
  options = {hash:{
    'tagName': ("li")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "settings", options) : helperMissing.call(depth0, "link-to", "settings", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </ul>\n        </div>\n	</nav>\n	<div class=\"container\" id=\"main\" role=\"main\">\n		");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n	</div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Songs");
  }

  data.buffer.push("<div class=\"jumbotron\">\n    <h1>Welcome to mormuvid!</h1>\n    Perhaps you'd like to look at the ");
  hashContexts = {'class': depth0,'role': depth0};
  hashTypes = {'class': "STRING",'role': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary"),
    'role': ("button")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "songs", options) : helperMissing.call(depth0, "link-to", "songs", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("?\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["loading"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Loading ...</h1>\n");
  
});

Ember.TEMPLATES["song"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<h3>Song: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "artist", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" - ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  return buffer;
  
});

Ember.TEMPLATES["song/delete"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"alert alert-warning\" role=\"alert\">\n  <strong>Sorry!</strong> Deleting Songs not implemented yet.\n</div>");
  
});

Ember.TEMPLATES["song/edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"alert alert-warning\" role=\"alert\">\n  <strong>Sorry!</strong> Editing Songs not implemented yet.\n</div>");
  
});

Ember.TEMPLATES["song/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Edit");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Delete");
  }

  data.buffer.push("<dl>\n  <dt>artist</dt><dd>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "artist", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\n  <dt>title</dt><dd>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\n  <dt>status</dt><dd>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "status", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\n</dl>\n\n<button class=\"btn\" onclick=\"window.history.back()\">Back</button>\n");
  hashContexts = {'class': depth0,'role': depth0};
  hashTypes = {'class': "STRING",'role': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary"),
    'role': ("button")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "song.edit", options) : helperMissing.call(depth0, "link-to", "song.edit", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  hashContexts = {'class': depth0,'role': depth0};
  hashTypes = {'class': "STRING",'role': "STRING"};
  options = {hash:{
    'class': ("btn btn-danger"),
    'role': ("button")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "song.delete", options) : helperMissing.call(depth0, "link-to", "song.delete", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["songs"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("Songs");
  }

  data.buffer.push("<div class=\"page-header\">\n    <h1>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "songs", options) : helperMissing.call(depth0, "link-to", "songs", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</h1>\n</div>\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["songs/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Add New Song »");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n        <tr ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSong", "", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            <td>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "song", "", options) : helperMissing.call(depth0, "link-to", "song", "", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</td>\n            <td>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "song", "", options) : helperMissing.call(depth0, "link-to", "song", "", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</td>\n        </tr>\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "artist", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

function program6(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

  data.buffer.push("<p>\n    ");
  hashContexts = {'class': depth0,'role': depth0};
  hashTypes = {'class': "STRING",'role': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary"),
    'role': ("button")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "songs.new", options) : helperMissing.call(depth0, "link-to", "songs.new", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n</p>\n\n<table class=\"table table-hover table-condensed mormuvid-table-clickable\">\n    <thead>\n        <tr>\n            <th>Artist</th>\n            <th>Title</th>\n        </tr>\n    </thead>\n    <tbody>\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "controller.arrangedContent", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </tbody>\n</table>\n");
  return buffer;
  
});

Ember.TEMPLATES["songs/new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<h3>New Song</h3>\n<form>\n    <div class=\"form-group\">\n        <label for=\"inputArtist\">Artist</label>\n        ");
  hashContexts = {'type': depth0,'value': depth0,'class': depth0,'id': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'class': "STRING",'id': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'value': ("artist"),
    'class': ("form-control"),
    'id': ("inputArtist"),
    'placeholder': ("e.g. PSY")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n    <div class=\"form-group\">\n        <label for=\"inputTitle\">Title</label>\n        ");
  hashContexts = {'type': depth0,'value': depth0,'class': depth0,'id': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'class': "STRING",'id': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'value': ("title"),
    'class': ("form-control"),
    'id': ("inputTitle"),
    'placeholder': ("e.g. Gangnam Style")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n    <div class=\"form-group\">\n        <label for=\"inputVideoURL\">Video URL (Optional)</label>\n        ");
  hashContexts = {'type': depth0,'value': depth0,'class': depth0,'id': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'class': "STRING",'id': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'value': ("inputVideoURL"),
    'class': ("form-control"),
    'id': ("inputVideoURL"),
    'placeholder': ("e.g. https://www.youtube.com/watch?v=9bZkp7q19f0")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n    <button class=\"btn\" onclick=\"window.history.back()\">Cancel</button>\n    <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSong", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Add Song</button>\n</form>\n");
  return buffer;
  
});