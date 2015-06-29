var LoginView = {
  app: undefined,
  view_manager: undefined,

  initialize: function(app, options) {
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
      self._onSubmit($("#email").val(), $("#password").val());
    });

    if(options.hasOwnProperty("message")) {
      $("#info_message").text(options.message);
      $("#info_message").removeClass("hidden");
    }

  },

  _onSubmit: function(email, password) {
    var self = this;

    //TODO add check for values
    console.log("sending packet");
    this.getApp().send("user#login", {email: email, password: password});
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
