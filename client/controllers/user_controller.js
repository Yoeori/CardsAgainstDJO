var UserController = {

  updateUsername: function(app, name) {
    app.getSocket().emit("user_set_username", name);
  },

  receiveUsername: function(app, name) {
    app.getUser().setUsername(name);
  },

  receiveUserData: function(app, data) {

  }

}
