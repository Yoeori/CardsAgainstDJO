var Card = module.exports = {

  text: undefined,
  pack: undefined,
  type: undefined,

  numAnswers: 0,

  initialize: function(text, type, numberOfAnswers, pack) {
    if(type != "black") {
      pack = this.setNumberOfAnswers(numberOfAnswers);
    }

    this.setType(type);
    this.setText(text);
    this.setPack(pack);
  },

  setText: function(text) {
    if(this.getType() == "white")
      text = this._capitalize(text);
    this.text = text;
  },

  setPack: function(pack) {
    this.pack = pack;
  },

  setType: function(type) {
    if(type == "black" || type == "white") {
      this.type = type;
    }
  },

  setNumberOfAnswers: function(i) {
    this.numAnswers = i;
  },

  getText: function() {
    return this.text;
  },

  getPack: function() {
    return this.pack;
  },

  getType: function() {
    return this.type;
  },

  getNumberOfAnswers: function() {
    if(this.type == "black") {
      return this.numAnswers;
    }
    return false;
  },

  isBlackCard: function() {
    return this.type == "black";
  },

  isWhiteCard: function() {
    return this.type == "white";
  },

  equals: function(card) {
    return card.getPack().getId() == this.getPack().getId() && card.isBlackCard() == this.isBlackCard() && card.getText() == this.getText() && card.getNumberOfAnswers() == this.getNumberOfAnswers();
  },

  _capitalize: function(s) {
    return s && s.charAt(0).toUpperCase() + s.slice(1);
  },

}
