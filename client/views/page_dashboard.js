var PageDashboardView = {
  app: undefined,

  initialize: function(app) {
    this.app = app;

    $("#page_dashboard").removeClass("hidden");
  },

  onDie: function() {
    $("#page_dashboard").addClass("hidden");
  }
}
