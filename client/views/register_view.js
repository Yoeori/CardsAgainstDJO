var RegisterView = {

  app: undefined,
  view_manager: undefined,
  captcha_loaded: false,

  email_recaptcha: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function(app, arguments) {
    var self = this;

    this.app = app;

    this.captcha_loaded = false;

    this.view_manager = this.getApp().getViewManager();
    this.view_manager.setContent("register");

    $("#cancel_submit_button").click(function() {
      self.getViewManager().setView(Object.create(LoginView));
    });

    $("#register_form").submit(function(e) {
      $("#register_error").addClass("hidden");
      self._onSubmit(
        $("#register_username").val(),
        $("#register_email").val(),
        $("#register_password").val(),
        $("#register_password_confirm").val(),
        grecaptcha.getResponse()
      );
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

  _onSubmit: function(username, email, password, password_confirmation, recaptcha_code) {
    var self = this;

    $("#register_form :input").attr("disabled", true);

    //Check values
    if(username == "" || email == "" || password == "" || password_confirmation == "") {
      return this.submitError("please fill in the whole form.");
    }

    if(password != password_confirmation) {
      return this.submitError("the passwords do not match.");
    }

    if(recaptcha_code == "") {
      return this.submitError("please verify you are human.");
    }

    //Submit
    this.getApp().send("user#register", {username: username, email: email, password: password, recaptcha_code: recaptcha_code});
  },

  submitError: function(error_message) {
    grecaptcha.reset();
    $("#register_form :input").attr("disabled", false);
    $("#register_error_text").text(error_message);
    $("#register_error").removeClass("hidden");
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
