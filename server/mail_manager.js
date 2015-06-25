var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {

  app: undefined,
  options: {},
  transporter: undefined,

  initialize: function(app) {
    this.app = app;

    this.options = this.getApp().getConfig()["mail"];

    this._setupTransporter();
  },

  _setupTransporter: function() {
    if(this.getConfig()["type"] == "simple") {
      this.transporter = nodemailer.createTransport(this.getConfig()["authentication"]);
    } else if (this.getConfig()["type"] == "smtp") {
      this.transporter = nodemailer.createTransport(smtpTransport(this.getConfig()["authentication"]));
    } else {
      console.log("failed to set up email");
    }
  },

  send: function(data, callback) {
    data.from = this.getConfig()["from"] || data.from || "Cards Against DJO <cardsagainstdjo@example.com>";

    this.getTransporter().sendMail(data, function(err, info) {
      if(typeof callback == "function") {
        callback(err, info);
      }
    });
  },

  getApp: function() {
    return this.app
  },

  getConfig: function() {
    return this.options;
  },

  getTransporter: function() {
    return this.transporter;
  }

}
