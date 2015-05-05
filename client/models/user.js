var UserModel = {

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
    this.socket.emit("set_username", this.getUsername());
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

  recieveUserData: function(data) {
    console.log("Recieved user data:");
    console.log(data);
    this.setUsername(data["username"]);
  }

}
