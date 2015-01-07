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
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "videos", options) : helperMissing.call(depth0, "link-to", "videos", options));
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

Ember.TEMPLATES["components/x-woof-message"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":woof-message :alert :alert-dismissable message.typeClass")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "message.message", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/x-woof"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n  ");
  hashContexts = {'message': depth0};
  hashTypes = {'message': "ID"};
  options = {hash:{
    'message': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['x-woof-message'] || depth0['x-woof-message']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "x-woof-message", options))));
  data.buffer.push("\n");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "messages", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("songs");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("other videos");
  }

  data.buffer.push("<div class=\"jumbotron\">\n    <h1>Welcome to mormuvid</h1>\n    <p>... bringing you <b>mor</b>e <b>mu</b>sic and more <b>vid</b>eos!</p>\n    <p>Perhaps you'd like to start with the ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "songs", options) : helperMissing.call(depth0, "link-to", "songs", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("? Or download some ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "videos", options) : helperMissing.call(depth0, "link-to", "videos", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("?</p>\n</div>\n");
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


  data.buffer.push("<h3>");
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
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Cancel");
  }

  data.buffer.push("<div class=\"row\">\n    <div class=\"alert alert-warning\" role=\"alert\">\n        Are you <strong>sure</strong> you want to delete '");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("'' by ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "artist", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("?\n    </div>\n    <form role=\"form\">\n    <div class=\"control-group\">\n        ");
  hashContexts = {'class': depth0,'role': depth0};
  hashTypes = {'class': "STRING",'role': "STRING"};
  options = {hash:{
    'class': ("btn btn-default"),
    'role': ("button")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "song", options) : helperMissing.call(depth0, "link-to", "song", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        <button class='btn btn-danger' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteSong", "song", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Really Delete It</button>\n        <br>\n    </div>\n    </form>\n</div>\n\n<div class=\"row\">&nbsp;</div>\n\n<div class=\"row\">\n    <br>\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        <h4 class=\"panel-title\">Advanced Delete Options</h4>\n      </div>\n      <div class=\"panel-body\">\n\n        <form role=\"form\">\n        <div class=\"checkbox\">\n            <label>\n                ");
  hashContexts = {'type': depth0,'checked': depth0,'id': depth0};
  hashTypes = {'type': "STRING",'checked': "ID",'id': "STRING"};
  options = {hash:{
    'type': ("checkbox"),
    'checked': ("doNotDownloadSameSong"),
    'id': ("doNotDownloadSameSong")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                Never automatically download this song ('");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("'' by ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "artist", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(") again.\n            </label>\n        </div>\n        <div class=\"checkbox\">\n            <label>\n                ");
  hashContexts = {'type': depth0,'checked': depth0,'id': depth0};
  hashTypes = {'type': "STRING",'checked': "ID",'id': "STRING"};
  options = {hash:{
    'type': ("checkbox"),
    'checked': ("doNotDownloadSameArtist"),
    'id': ("doNotDownloadSameArtist")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                Never automatically download <strong>any</strong> songs by this artist (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "artist", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(") again.\n            </label>\n        </div>\n        </form>\n\n      </div>\n    </div>\n</div>");
  return buffer;
  
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
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <tr ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSong", "", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "artist", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n        </tr>\n        ");
  return buffer;
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


  data.buffer.push("<h3>New Song</h3>\n<form role=\"form\">\n    <div class=\"form-group\">\n        <label for=\"inputArtist\">Artist</label>\n        ");
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
    'value': ("videoURL"),
    'class': ("form-control"),
    'id': ("inputVideoURL"),
    'placeholder': ("e.g. https://www.youtube.com/watch?v=9bZkp7q19f0")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "x-woof", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    <button class=\"btn\" onclick=\"window.history.back()\">Cancel</button>\n    <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSong", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Add Song</button>\n</form>\n");
  return buffer;
  
});

Ember.TEMPLATES["videos"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("the Songs tab");
  }

  data.buffer.push("<h3>Download A Video</h3>\n<p>\n(which presumably <i>isn't</i> a music video, since ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "songs", options) : helperMissing.call(depth0, "link-to", "songs", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" is better for those?)\n</p>\n<form role=\"form\">\n    <div class=\"form-group\">\n        <label for=\"inputVideoURL\">Video URL</label>\n        ");
  hashContexts = {'type': depth0,'value': depth0,'class': depth0,'id': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'class': "STRING",'id': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'value': ("videoURL"),
    'class': ("form-control"),
    'id': ("inputVideoURL"),
    'placeholder': ("e.g. https://www.youtube.com/watch?v=9bZkp7q19f0")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "x-woof", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    <button class=\"btn\" onclick=\"window.history.back()\">Cancel</button>\n    <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadVideo", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Download Video</button>\n</form>\n");
  return buffer;
  
});