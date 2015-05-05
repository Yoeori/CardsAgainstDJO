module.exports = GamePlayer = {

  user: undefined,
  score: 0,
  whiteCards: [],
  isCardCzar: false,

  setUser: function(user) {
    this.user = user;
  },

  getUser: function() {
    return this.user;
  },

  wonRound: function() {
    score++;
  },

  setCardCzar: function() {
    this.isCardCzar = true;
  },

  endRound: function() {
    this.isCardCzar = false;
  },

  addWhiteCards: function(cards) {
    this.whiteCards = this.whiteCards.concant(cards);
  },

  getPublicGameData: function() {
    return {

    }
  }

}
