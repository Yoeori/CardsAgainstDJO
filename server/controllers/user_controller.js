var bcrypt = require('bcryptjs');

module.exports = UserController = {

  app: undefined,

  initialize: function(app) {
    this.app = app;
  },

  login: function(socket, data /* email/password */) {
    var connection = this.getApp().getConnection();

    connection.query("SELECT * FROM `Users` WHERE `email` = '"+ data.email.toLowerCase() +"'", function(err, rows, fields) {

      if(err == null && rows.length == 1) {

        //Check if bcrypt password is correct
        bcrypt.compare(data.password, rows[0].password, function(err, res) {
          //TODO
          if(res == true) {
            //succesfully logged in
            console.log("user "+ rows[0].username + " has succesfully logged in");
          } else {
            //login failed
            console.log("user "+ rows[0].username + " has failed to log in");
          }
        });

      } else {
        console.log("user "+ data.email + " has failed to log in");
      }

    });

  },

  register: function(socket, data /* username/email/password */) {

  },

  getApp: function() {
    return this.app;
  }

}
