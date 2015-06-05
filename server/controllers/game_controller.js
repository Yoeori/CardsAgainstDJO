module.exports = GameController = {

  app: undefined,

  initialize: function(app) {
    this.app = app;
  },

  test: function() {
    console.log("Test packet was received.");
  }

};
