var CardManager = require("./card_manager");
var MySQL = require("mysql");
var PacketManager = require("./packet_manager");
var MailManager = require("./mail_manager");

module.exports = App = {

  io: undefined,
  users: {},
  games: [],
  cardManager: undefined,
  connection: undefined,

  packet_manager: undefined,

  mailer: undefined,

  initialize: function(io, config) {
    var self = this;

    this.config = config;

    //Initialize MySQL
    this.connection = MySQL.createConnection(this.getConfig()["database"]);
    this.connection.connect(function(err) {
      if(err) return self.error(err);
      console.info("Connected to database on " + self.getConfig()["database"]["user"] + "@" + self.getConfig()["database"]["host"]);
    });

    this.cardManager = Object.create(CardManager);
    this.cardManager.initialize();

    this.io = io;

    this.packet_manager = Object.create(PacketManager);
    this.packet_manager.initialize(this);

    this.mailer = Object.create(MailManager);
    this.mailer.initialize(this);


  },

  /*
  loginWithToken: function(user, id, token) {
    if(this.users[id].getToken() == token) {
      this.users[id].setSocket(user.getSocket());
      user = this.users[id];
      delete this.users[id];
      user.sendUserData();
    }
  },
  */

  getCardManager: function() {
    return this.cardManager;
  },

  /*
  userConnect: function(socket) {
    this.users[socket.id] = Object.create(User);
    this.users[socket.id].initialize(this, socket);
  },
  */

  /*
  hasUserWithUsername: function(username) {
    for(user_id in this.users) {
      user = this.users[user_id];
      if(user.getUsername() != undefined && user.getUsername().toLowerCase() == username.toLowerCase()) {
        return true;
      }
    }
    return false;
  },
  */

  getConfig: function() {
    return this.config;
  },

  getConnection: function() {
    return this.connection;
  },

  getIO: function() {
    return this.io;
  },

  error: function(error) {
    console.error(error);
  },

  getPacketManager: function() {
    return this.packet_manager;
  },

  getMailer: function() {
    return this.mailer;
  },

  send: function(sockets, packet) {
    this.getPacketManager().sendPacketToSockets(packet.name, sockets, packet.data);
  },

};
