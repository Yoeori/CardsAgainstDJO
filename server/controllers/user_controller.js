var bcrypt = require('bcryptjs');
var https = require('https');

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

  register: function(socket, data /* username/email/password/recaptcha_code */) {
    var email_recaptcha = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var username = data.username;
    var email = data.email.toLowerCase();
    var password = data.password;
    var recaptcha_code = data.recaptcha_code;

    this._verifyRecaptcha(recaptcha_code, function(success) {
      if(success) {

        //Checks
        if(username == "" || email == "" || password == "") {
          return this.getApp().send(socket, "user#register_error", {error: "please fill in the whole form."});
        }

        if(!email.test(email_recaptcha)) {
          return this.getApp().send(socket, "user#register_error", {error: "please fill in a valid email address."});
        }

      } else {
        return this.getApp().send(socket, "user#register_error", {error: "error while checking your recaptcha response, please try again."});
      }
    });
  },

  _verifyRecaptcha: function(token, call) {
    var recaptcha_secret = this.getApp().getConfig()["recaptcha"]["google-secretkey"];

    https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + recaptcha_secret + "&response=" + token, function(res) {
      var data = "";

      res.on('data', function (chunk) {
        data += chunk.toString();
      });

      res.on('end', function() {

        try {
          data = JSON.parse(data);
          call(data.success);
        } catch (e) {
          call(false);
        }

      });

    });
  },

  getApp: function() {
    return this.app;
  }

}
