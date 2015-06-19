var LoginView = {
  app: undefined,
  view_manager: undefined,

  initialize: function(app, arguments) {
    var self = this;

    this.app = app;

    this.view_manager = this.getApp().getViewManager();
    this.view_manager.setContent("login");

    $('[data-onclick="register"]').click(function() {
      self.getViewManager().setView(Object.create(RegisterView));
    });

    setTimeout(function() {
      $("#username").focus();
    }, 1);


    $("#login_form").submit(function(e) {
      self._onSubmit($("#username").val(), $("#password").val());
    });

  },

  _onSubmit: function(username, password) {
    var self = this;

    //TODO add check for values
    console.log("sending packet");
    this.getApp().send("user#login", {username: username, password: password});
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
