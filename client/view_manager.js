var ViewManager = {

  app: undefined,
  view_history: [],
  current_view: undefined,

  initialize: function(app) {
    this.app = app;
    this.view_history = [];

    this._cacheAllTemplates();
  },

  getApp: function() {
    return this.app;
  },

  _cacheAllTemplates: function() {
    var self = this;

    $('[type="x-tmpl-mustache"]').each(function() {
      var m = self.getMustache();
      console.log(this);
      m.parse($(this).html());
    });
  },

  setView: function(view) {
    if(this.getCurrentView() != undefined) {
      this.view_history.push(this.getCurrentView());
    }
    
    this.current_view = view;
  },

  getCurrentView: function() {
    return this.current_view;
  },

  getMustache: function() {
    return Mustache;
  },

  getTemplate: function(name) {

  },
 
}
