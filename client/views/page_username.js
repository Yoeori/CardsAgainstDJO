var PageUsernameView = {
  app: undefined,

  initialize: function(app) {
    self = this;

    this.app = app;

    this.unbindfunction = function(e) {
      if(e.which === 13) {
        self.onSubmit($("#username").val());
      }
    };

    $(document).on('keydown', '#username', this.unbindfunction);
    $("#username_submit_button").click(function(e) {
      self.onSubmit($("#username").val());
    });

    $("#page_username").removeClass("hidden");
  },

  onSubmit: function(username) {
    var self = this;

    console.log("Username is being set to:" + username);

    this.getApp().getSocket().once("set_username_failed", function() {
      //TODO
      console.log("Faulty username");
      $("#username").prop('disabled', false);
    });

    this.getApp().getSocket().once("set_username_succeeded", function() {
      this.getApp().setView(PageDashboardView);
    });

    this.getApp().getUser().setUsername(username);
  },

  onDie: function() {
    $("#page_username").addClass("hidden");
    $("#username_submit_button").unbind();
    $(document).off('keydown', '#username', this.unbindfunction);
    $("#username").prop('disabled', false);
  },

  getApp: function() {
    return this.app;
  }
}
