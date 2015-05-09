var User;
module.exports = User = {

  socket: undefined,
  name: undefined,

  initialize: function(app, socket) {
    var self = this;

    this.app = app;
    this.socket = socket;

    this.socket.on("user_data", function(data) {
      self.recieveUserData(data);
    })
  },

  setUsername: function(username) {
    this.name = username;
  },

  getUsername: function() {
    return this.name;
  },

  getSocket: function() {
    return this.socket;
  },

  getApp: function() {
    return this.app;
  }

}
