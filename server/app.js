var User = require("./models/user");
var Game = require("./models/game");
var CardManager = require("./card_manager");

module.exports = App = {

  io: undefined,
  users: {},
  games: [],
  cardManager: undefined,

  initialize: function(io) {
    var self = this;
    this.io = io;

    this.cardManager = Object.create(CardManager);
    this.cardManager.initialize;

    this.io.on('connection', function(socket) {
      self.userConnect(socket);
    });

  },

  getCardManager: function() {
    return this.cardManager;
  },

  userConnect: function(socket) {
    this.users[socket.id] = Object.create(User);
    this.users[socket.id].initialize(this, socket);
  },

  userDisconnect: function(socket) {
    delete this.users[socket.id];
  },

  hasUserWithUsername: function(username) {
    for(user in this.users) {
      if(user.getUsername() == username) {
        return true;
      }
    }
    return false;
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
