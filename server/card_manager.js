var Card = require("./models/card");
var Deck = require("./models/deck");
var fs = require("fs");
var packDownloader = require("./packDownloader");

module.exports = CardManager = {

  CARDS_LOCATION: "./cards/",

  decks: {},

  initialize: function() {

    card_files_list = fs.readdirSync(this.CARDS_LOCATION);

    for(var i = 0; i < card_files_list.length; i++) {

      plain_deck = require(this.CARDS_LOCATION + card_files_list[i]);

      new_deck = Object.create(Deck);
      new_deck.load(plain_deck);
      this.decks[new_deck.id] = new_deck;

    }

    console.log("Loaded all " + card_files_list.length + "decks.");

  },

  getDeck: function(id) {
    if(typeof decks[id] != "undefined") {
      return decks[id];
    }
    return {error: true, message: "deck not found"};
  },

  doesDeckExist: function(id) {
    return typeof decks[id] != "undefined";
  },

  downloadDeck: function(id, callback) {
    if(!this.doesDeckExist(id)) {
      packDownloader(id, function(plain_deck, error) {
        if(error == false) {
          new_deck = Object.create(Deck);
          new_deck.load(plain_deck);
          this.decks[new_deck.id] = new_deck;
          callback(new_deck, false);
        } else {
          callback(null, error);
        }
      });
    } else {
      callback(this.getDeck(id), false);
    }
  },


}
