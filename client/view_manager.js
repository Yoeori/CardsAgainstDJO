var ViewManager = {

  app: undefined,
  view_history: [],
  current_view: undefined,

  initialize: function(app) {
    this.app = app;
    this.view_history = [];
  },

  getApp: function() {
    return this.app;
  },

  setView: function(view) {
    if(this.getCurrentView() != undefined) {
      this.view_history.push(this.getCurrentView());
    }
    
    this.current_view = view;
  },

  getCurrentView: function() {
    return this.current_view;
  }

}
