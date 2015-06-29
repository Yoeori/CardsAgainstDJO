ControllersRouter.registerController("user", {

  app: undefined,

  initialize: function(app) {
    this.app = app;
  },

  register_error: function(data) {
    this.getApp().getViewManager().getCurrentView().submitError(data.error);
  },

  register_complete: function() {
    this.getApp().getViewManager().setView(Object.create(LoginView), {message: "An email has been sent, please click the url provided to confirm your account."});
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
