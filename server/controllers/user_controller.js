module.exports = UserController = {

  app: undefined,

  initialize: function(app) {
    this.app = app;
  },

  login: function(socket, data /* username/password */) {
    var connection = this.getApp().getConnection();
    
    this.getApp().send(socket, {name: 'set_username', data: {username: "test"}});

  },

  register: function(socket, data /* username/email/password */) {

  },

  getApp: function() {
    return this.app;
  }

}
