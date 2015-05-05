module.exports = User = {

  app: undefined,
  socket: undefined,
  name: undefined,

  initialize: function(app, socket) {
    var self = this;

    this.app = app;
    this.socket = socket;

    socket.on('disconnect', function() {
      self.onDisconnect();
    });

    this.socket.once('set_username', function(username) {
      self.setUsername(username);
    })
  },

  setUsername: function(username) {
    console.log("User " + this.socket.id + " is trying to set its username to: " + username);

    if(!this.getApp().hasUserWithUsername(username) && username != "") {
      this.name = username;
      this.socket.emit("set_username_succeeded", true);
    } else {
      this.socket.emit("set_username_failed", true);
    }

    this.sendUserData();
  },

  getUsername: function() {
    return this.name;
  },

  getSocket: function() {
    return this.socket;
  },

  getApp: function() {
    return this.app;
  },

  onDisconnect: function() {
    console.log("user "+ this.socket.id +" has disconnected from the server.");
    this.app.userDisconnect(this.socket);
  },

  sendUserData: function() {
    data = this._getUserData();
    this.socket.emit('user_data', data);
  },

  _getUserData: function() {
    return {
      username: this.getUsername(),
    }
  }

}
