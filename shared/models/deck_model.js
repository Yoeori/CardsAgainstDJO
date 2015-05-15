var Deck = module.exports = {

  id: undefined,
  name: undefined,
  description: undefined,
  rating: undefined,
  blackCards: [],
  whiteCards: [],

  initialize: function() {
    this.blackCards = [];
    this.whiteCards = []; // Yay fuck you too javascript!
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

  setRating: function(rating) {
    this.rating = rating;
  },

  getRating: function() {
    return this.rating;
  },

  getBlackCards: function() {
    return this.blackCards;
  },

  getWhiteCards: function() {
    return this.whiteCards;
  },

  getId: function() {
    return this.id;
  },

  addBlackCard: function(card) {
    this.whiteCards.push(card);
  },

  addBlackCards: function() {
    args = typeof arguments[0] == "Array" ? arguments[0] : arguments;
    for(var i = 0; i < args.length; i++) {
      this.addBlackCard(args[i]);
    }
  },

  addWhiteCard: function(card) {
    this.whiteCards.push(card);
  },

  addWhiteCards: function() {
    args = typeof arguments[0] == "Array" ? arguments[0] : arguments;
    for(var i = 0; i < args.length; i++) {
      this.addWhiteCard(args[i]);
    }
  },

}
