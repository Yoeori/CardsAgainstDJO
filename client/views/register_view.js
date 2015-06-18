var RegisterView = {

  app: undefined,
  view_manager: undefined,
  captcha_loaded: false,

  initialize: function(app, arguments) {
    var self = this;

    this.app = app;

    this.captcha_loaded = false;

    this.view_manager = this.getApp().getViewManager();
    this.view_manager.setContent("register");

    $("#cancel_submit_button").click(function() {
      self.getViewManager().setView(Object.create(LoginView));
    });

    $("#register_username").focus();

    this._renderCaptcha();

  },

  _renderCaptcha: function() {

    if(!this.captcha_loaded) {

      $("#register_captcha").empty();
      grecaptcha.render('register_captcha', {
        'sitekey' : '6LfwRAgTAAAAAOvRpPMX4vSgyMdvQZzES0HkTVuu'
      });

      this.captcha_loaded = true;

    } else {
      grecaptcha.reset();
    }

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
