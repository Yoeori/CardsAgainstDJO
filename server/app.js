var User = require("./models/user");
var Game = require("./models/game");
var CardManager = require("./card_manager");
var mysql = require("mysql");

module.exports = App = {

  io: undefined,
  users: {},
  games: [],
  cardManager: undefined,

  initialize: function(io, config) {
    var self = this;
    this.io = io;
    this.config = config;

    //Initialize MySQL
    this.connection = mysql.createConnection(this.getConfig()["database"]);

    this.cardManager = Object.create(CardManager);
    this.cardManager.initialize;

    this.io.on('connection', function(socket) {
      self.userConnect(socket);

      socket.on("login_with_token", function(data) {
        self.loginWithToken(this.users[socket.id], data["id"], data["token"]);
      });
    });

  },

  loginWithToken: function(user, id, token) {
    if(this.users[id].getToken() == token) {
      this.users[id].setSocket(user.getSocket());
      user = this.users[id];
      delete this.users[id];
      user.sendUserData();
    }
  },

  getCardManager: function() {
    return this.cardManager;
  },

  userConnect: function(socket) {
    this.users[socket.id] = Object.create(User);
    this.users[socket.id].initialize(this, socket);
  },

  hasUserWithUsername: function(username) {
    for(user_id in this.users) {
      user = this.users[user_id];
      if(user.getUsername() != undefined && user.getUsername().toLowerCase() == username.toLowerCase()) {
        return true;
      }
    }
    return false;
  },

  getConfig: function() {
    return this.config;
  },

  getConnection: function() {
    return this.connection;
  }

};

function setupUser(socket) {



  console.log(users[socket.id].name)

  socket.on('set_username', function(username) {
    users[socket.id].name = username;
    socket.emit("userdata", users[socket.id].name);
  });

  socket.on('create_game', function() {

  });

  socket.on('join_game', function(id) {

  });


}
