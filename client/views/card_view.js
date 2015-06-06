var CardView = {

  card: undefined,
  size: 200,
  x: 100,
  y: 100,

  view_manager: undefined,

  initialize: function(view_manager, card) {
    this.view_manager = view_manager;
    this.setCard(card);
  },

  render: function() {

    var ctx = this.getViewManager.getContext();

    var x = this.getX();
    var y = this.getY()s;

    var size = this.getSize();
    var delta = size[0] / 200;

    var curve = 25 * delta;
    var margin = [20 * delta, 31 * delta];

    ctx.save();
    ctx.transform(1,0,0,1, 5 * delta, 5 * delta);
    this._makePath(ctx, x, y, size, curve);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fill();
    ctx.restore();

    this._makePath(ctx, x, y, size, curve);
    ctx.lineWidth = 0.5;
    ctx.fillStyle = this.getCard().getType() == "black" ? '#000' : '#FFF';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = this.getCard().getType() != "black" ? '#000' : '#FFF';
    text = this._getLines(ctx, this.getCard().getText(), size[0]-margin[0]*2, "bold "+ 16* delta  +"px 'Open Sans'");

    for(var i = 0; i < text.length; i++) {
      ctx.fillText(text[i], x+margin[0], y+margin[1]+(23*i* delta));
    };

  },

  setCard: function(card) {

    if(this.card == undefined)
      this.card = card;
  },

  getCard: function() {
    return this.card;
  },

  setX: function(x) {
    this.x = x;
  },

  setY: function(y) {
    this.y = y;
  },

  getX: function() {
    return this.x;
  },

  getY: function() {
    return this.y;
  },

  getSize: function() {
    return [this.size, this.size * 1.5];
  },

  setSize: function(size) {
    this.size = size;
  },

  _makePath: function(ctx, x, y, size, curve) {
    ctx.beginPath();
    ctx.moveTo(x+curve, y);
    ctx.lineTo(x+size[0]-curve, y);
    ctx.quadraticCurveTo(x+size[0], y, x+size[0], y+curve);
    ctx.lineTo(x+size[0], y+size[1]-curve);
    ctx.quadraticCurveTo(x+size[0], y+size[1], x+size[0]-curve, y+size[1]);
    ctx.lineTo(x+curve, y+size[1]);
    ctx.quadraticCurveTo(x, y+size[1], x, y+size[1]-curve);
    ctx.lineTo(x, y+curve);
    ctx.quadraticCurveTo(x, y, x+curve, y);
  },

  /**
   * Splits the text in number of lines that fit in a certain sendPacket, credit goes to someone sadly I do not know who.
   * @param  {context} ctx         instance of the canvas' context
   * @param  {String}  phrase      the text to be split
   * @param  {int}     maxPxLength the number of pixels max in one lines
   * @param  {String}  textStyle   the style of text (font, size)
   * @return {Array}               an array of lines that are a maximum of the maxPxLenght length
   */
  _getLines: function(ctx, phrase, maxPxLength, textStyle) {
    var wa = phrase.split(" "),
        phraseArray = [],
        lastPhrase = wa[0],
        l = maxPxLength,
        measure = 0;

    if(wa.length == 1)
      return [phrase];

    ctx.font = textStyle;
    for (var i = 1; i < wa.length; i++) {
      var w = wa[i];
      measure = ctx.measureText(lastPhrase+w).width;
      if (measure < l) {
        lastPhrase += (" "+w);
      } else {
        phraseArray.push(lastPhrase);
        lastPhrase = w;
      }
      if (i === wa.length-1) {
        phraseArray.push(lastPhrase);
        break;
      }
    }

    return phraseArray;
  },

  _getViewManager: function() {
    return this.view_manager;
  }
}
