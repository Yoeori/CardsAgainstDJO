var Card = require("./card");

module.exports = Deck = {

  id: undefined,
  name: undefined,
  description: undefined,
  rating: undefined,
  blackCards: [],
  whiteCards: [],

  load: function(deck) {
    this.blackCards = [];
    this.whiteCards = [];

    this.setId(deck["info"]["code"]);
    this.setName(deck["info"]["name"]);
    this.setDescription(deck["info"]["description"]);

    for(var i = 0; i < deck["cards"]["calls"].length; i++) {
      plain_black_card = deck["cards"]["calls"][i];
      new_card = Object.create(Card);
      new_card.initialize(plain_black_card["text"], "black", plain_black_card["answers"], this);
      this.blackCards.push(new_card);
    }

    for(var i = 0; i < deck["cards"]["responses"].length; i++) {
      plain_white_card = deck["cards"]["responses"][i];
      new_card = Object.create(Card);
      new_card.initialize(plain_white_card["text"], "white", this);
      this.whiteCards.push(new_card);
    }
  },

  setName: function(name) {
    this.name = name;
  },

  setId: function(id) {
    this.id = id;
  },

  setDescription: function(description) {
    this.description = description;
  },

  getBlackCards: function() {
    return this.blackCards;
  },

  getWhiteCards: function() {
    return this.whiteCards;
  },

  getRating: function() {
    return this.rating;
  }

};
