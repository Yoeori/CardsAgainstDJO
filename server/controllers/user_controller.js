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

    connection.query("SELECT * FROM `Users` WHERE `email` = ? AND `rank` >= 0", [data.email.toLowerCase()], function(err, rows, fields) {

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
    var self = this;

    var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var username_regex = /^[0-9a-zA-Z_-]+$/;

    var username = data.username;
    var email = data.email.toLowerCase();
    var password = data.password;
    var recaptcha_code = data.recaptcha_code;

    var connection = this.getApp().getConnection();

    this._verifyRecaptcha(recaptcha_code, function(success) {
      if(success) {

        //Checks
        if(username == "" || email == "" || password == "") {
          return self.getApp().send(socket, "user#register_error", {error: "please fill in the whole form."});
        }

        if(!email_regex.test(email)) {
          return self.getApp().send(socket, "user#register_error", {error: "please fill in a valid email address."});
        }

        if(!username_regex.test(username)) {
          return self.getApp().send(socket, "user#register_error", {error: "please fill in a valid username! You can only use numbers, (capital) letters, underscores and hyphens."});
        }

        if(username.length < 3) {
          return self.getApp().send(socket, "user#register_error", {error: "your username is too short! Your username should be at least 3 characters long."});
        }

        if(self._byteLength(password) > 72) {
          return self.getApp().send(socket, "user#register_error", {error: "please shorten your password, it is too long."});
        }

        //TODO check that user and email aren't in use yet!

        //encrypt password
        bcrypt.hash(password, 11, function(err, hash) {
          if(err) return self.getApp().send(socket, "user#register_error", {error: "an error occured while hashing your password."});

          var validationtoken = self._randomString();

          connection.query("INSERT INTO Users (`username`, `email`, `password`, `validation_code`) VALUES (?, ?, ?, ?)", [username, email, hash, validationtoken], function(err, result) {
            if(err) {
              console.error(err);
              return self.getApp().send(socket, "user#register_error", {error: "an error occured while saving your account to the database."});
            }

            var url = self.getApp().getConfig()["url"] + "/" + validationtoken;

            self.getApp().getMailer().send({
                to: email,
                subject: 'Welcome to Cards Against DJO! Please confirm your account.',
                html: 'Please click the url to confirm your account: <a href="'+url+'">'+url+'</a>'
            });

            return self.getApp().send(socket, "user#register_complete", {});

          });


        });

      } else {
        return self.getApp().send(socket, "user#register_error", {error: "error while checking your recaptcha response, please try again."});
      }
    });
  },

  register_complete: function(token, req, res) {
    var connection = this.getApp().getConnection();

    connection.query("UPDATE `Users` SET `rank` = '0' WHERE `rank` = -1 AND `validation_code` = ?;", [token], function(err, result) {
      res.redirect(307, '/');
    });
  },

  /*
   * thanks to lovasoa from stackoverflow.com
   *
   */
  _byteLength: function(str) {
    // returns the byte length of an utf8 string
    var s = str.length;
    for(var i=str.length-1; i>=0; i--) {
      var code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;
      else if (code > 0x7ff && code <= 0xffff) s+=2;
      if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }
    return s;
  },

  _randomString: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
          var parsed_data = JSON.parse(data);
        } catch (e) {
          console.log("error while checking recaptcha");
          var parsed_data = {success: false};
        }

        call(parsed_data.success);

      });

    });
  },

  getApp: function() {
    return this.app;
  }

}
