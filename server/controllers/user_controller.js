var bcrypt = require('bcryptjs');

module.exports = UserController = {

  app: undefined,

  initialize: function(app) {
    this.app = app;
  },

  /**
   * Checks user credentials and logs them in.
   * @param  {Socket} socket the socket that is trying to log in
   * @param  {Object} data   data the user has filled in
   */
  login: function(socket, data /* email/password */) {
    var self = this;
    var connection = this.getApp().getConnection();

    connection.query("SELECT * FROM `Users` WHERE `email` = ?", [data.email.toLowerCase()], function(err, rows, fields) {

      if(err == null && rows.length == 1) {

        //Check if bcrypt password is correct
        bcrypt.compare(data.password, rows[0].password, function(err, res) {

          if(res == true) {

            //TODO handle succesfull login
            console.log("user "+ rows[0].username + " has succesfully logged in");

            self.getApp().getMailer().send({
                to: rows[0].email,
                subject: 'You just logged from ' + (socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress),
                text: 'We just wanted to tell you....'
            });


          } else {
            //TODO handle invalid details (send back failed login packet)
            console.log("user "+ rows[0].username + " has failed to log in");
          }
        });

      } else {

        if(err) {
          //TODO handle error on login (send back failed login packet with error)
          console.log("Error:");
          console.log(err);
          console.log(rows);
        } else {
          //TODO handle invalid details (send back failed login packet)
          console.log("user with email \""+ data.email + "\" has failed to log in");
        }


      }

    });

  },

  register: function(socket, data /* username/email/password */) {
    var username = data.username;
    var email = data.email;
    var password = data.password;
  },

  getApp: function() {
    return this.app;
  }

}
