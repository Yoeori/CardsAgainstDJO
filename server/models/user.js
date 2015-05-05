module.exports = User = {

  app: undefined,
  socket: undefined,
  name: undefined,
  token: undefined,

  initialize: function(app, socket) {
    var self = this;

    this.app = app;
    this.setSocket(socket);
    this.token = this._generateToken();

    socket.on('disconnect', function() {
      self.onDisconnect();
    });

    this.socket.on('set_username', function(username) {
      self.setUsername(username);
    });
  },

  setUsername: function(username) {
    if(this.name == undefined) {
      console.log("User " + this.socket.id + " is trying to set its username to: " + username);

      if(this.getApp().hasUserWithUsername(username) || username == null || username == "") {
        this.socket.emit("set_username_failed", true);
      } else {
        this.name = username;
        this.socket.emit("set_username_succeeded", true);
        this.socket.removeAllListeners("set_username");
      }

    } else {
      this.socket.emit("set_username_succeeded", true);
    }
    this.sendUserData();
  },

  getUsername: function() {
    return this.name;
  },

  getSocket: function() {
    return this.socket;
  },

  setSocket: function(socket) {
    this.socket = socket;
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
      id: this.id,
      token: this.getToken()
    }
  },

  getToken: function() {
    return this.token;
  },

  _generateToken: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

}
