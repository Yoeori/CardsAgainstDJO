var RegisterView = {
  app: undefined,
  view_manager: undefined,

  initialize: function(app, arguments) {
    var self = this;

    this.app = app;

    this.view_manager = this.getApp().getViewManager();
    this.view_manager.setContent("register");

  },

  _onSubmit: function(username) {
    var self = this;
  },

  onDie: function() {

  },

  getApp: function() {
    return this.app;
  },

  getViewManager: function() {
    return this.view_manager;
  }
}
