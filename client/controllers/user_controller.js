ControllersRouter.registerController("user", {

  app: undefined,

  initialize: function(app) {
    this.app = app;
  },

  register_error: function(data) {
    this.getApp().getViewManager().getCurrentView().submitError(data.error);
  },

  setUsername: function(data) {
    this.getApp().send("user#setusername", data);
  },

  receiveUsername: function(data) {
    this.getApp().getUser().setUsername(name);
  },

  receiveUserData: function(data) {

  },

  getApp: function() {
    return this.app;
  },

});
