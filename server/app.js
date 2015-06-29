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
    console.info("Connecting to database on " + self.getConfig()["database"]["user"] + "@" + self.getConfig()["database"]["host"]);
    this.connection = MySQL.createPool(this.getConfig()["database"]);

    this.connection.on('error', function(err) {
      self._handleMySQLerror(err);
    });

    this.cardManager = Object.create(CardManager);
    this.cardManager.initialize();

    this.io = io;

    this.packet_manager = Object.create(PacketManager);
    this.packet_manager.initialize(this);

    this.mailer = Object.create(MailManager);
    this.mailer.initialize(this);


  },

  _handleMySQLerror: function(err) {
    var self = this;

    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    this.connection = MySQL.createPool(this.getConfig()["database"]);
    this.connection.on('error', function(err) {
      self._handleMySQLerror(err);
    });

  },

  getCardManager: function() {
    return this.cardManager;
  },

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
    if(arguments.length == 3) {
      packet = {name: arguments[1], data: arguments[2]};
    }
    this.getPacketManager().sendPacketToSockets(packet.name, sockets, packet.data);
  },

};
