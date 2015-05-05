var GamePlayer = require("./game_player");

module.exports = Game = {

  app: undefined,
  id: undefined,

  players: [],
  spectators: [],

  decks: [],
  allBlackCards: [],
  allWhiteCards: [],
  currentBlackCard: undefined,

  currentCardCzar: undefined,
  isGameStarted: false,

  isPasswordNeeded: false,
  password: undefined,

  initialize: function(app) {

    this.players = [];
    this.spectators = [];
    this.decks = [];
    this.allBlackCards = [];
    this.allWhiteCards = [];

    this.isGameStarted = false;
    this.isPasswordNeeded = false;

    this.app = app;
    this.id = this._generateId();

  },

  setPassword: function(password) {
    this.password = password;
    this.isPasswordNeeded = true;
  },

  getId: function() {
    return this.id;
  },

  getApp: function() {
    return this.app;
  },

  startGame: function() {
    this.currentCardCzar = this._getRandomPlayerId();
    this.players[this.currentCardCzar].setCardCzar();
  },

  _getRandomPlayerId: function() {
    return Math.round(Math.random()*players.length);
  },

  fillCardsArray: function() {


  },

  sendGameDataToAllGameUsers: function() {
    var gamedata = this._getGameData();

    for(player in this.players) {
      player.getUser().getSocket().emit("game_data", gamedata);
    }

    for(spectator in this.spectators) {
      spectator.getSocket().emit("game_data", gamedata);
    }

  },

  _getGameData: function() {
    var player_data = [];

    return {
      password: this.isPasswordNeeded ? this.password : false,

    };
  },

  addUser: function(user, spectating) {
    var self = this;

    if(this.isPasswordNeeded) {

      user.getSocket().emit("game_password_require", true);
      user.getSocket().on("game_password", function(password) {
        if(password == self.password) {
          self._addUserToGame(user, spectating);
          user.getSocket().removeAllListeners("game_password");
        } else {
          user.getSocket().emit("game_password_incorrect", true);
        }
      });

    } else {
      this._addUserToGame(user, spectating);
    }
  },

  _addUserToGame: function(user, spectating) {
    if(spectating) {
      this.spectators.push(user);
      user.getSocket().emit("game_spectate", true);
    } else {
      gameplayer = Object.create(GamePlayer);
      gameplayer.setUser(user);
      this.players.push(gameplayer);

      user.getSocket().emit("game_join", true);
    }
  },

  _generateId: function() {

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

  }

}
