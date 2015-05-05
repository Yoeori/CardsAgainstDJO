module.exports = Card = {

  text: undefined,
  pack: undefined,
  type: undefined,
  numAnswers: 0,

  initialize: function(text, type, numberOfAnswers, pack) {
    if(type != "black") {
      pack = numberOfAnswers;
    }

    this.setText(text);
    this.setType(type);
    this.setPack(pack);
  },

  setText: function(text) {
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
  }
}
