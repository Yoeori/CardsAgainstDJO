var CardCanvasView = {

  /**
   * Current card that has to be rendered
   * @type {Card}
   * @private
   */
  card: undefined,

  /**
   * the width of the card in pixels
   * @type {int}
   * @private
   */
  size: 200,

  /**
   * The X position in the canvas of the card
   * @type {int}
   * @private
   */
  x: 100,

  /**
   * the Y position in the canvas of the card
   * @type {int}
   * @private
   */
  y: 100,

  /**
   * This views instance of the view manager
   * @type {ViewManager}
   * @private
   */
  view_manager: undefined,

  /**
   * All the listeners that are registered
   * @type {Object->Function}
   * @private
   */
  listeners: {},

  /**
   * Initializes an instance
   * @param  {App}  manager the running app instance
   * @param  {Card} card    an instance of the Card model
   */
  initialize: function(manager, card, x, y) {
    this.view_manager = app.getViewManager();
    this.setCard(card);

    if(arguments.length == 4) {
      this.setX(x);
      this.setY(y);
    }

    this.listeners = {"click": [], "hover": []};
  },

  /**
   * updates?
   * note: every canvas view should implement this function and the render function
   */
  update: function() {

  },

  /**
   * renders the card on the canvas
   * note: every canvas view should implement this function and the update function
   */
  render: function() {

    var ctx = this.getViewManager().getContext();

    var x = this.getX();
    var y = this.getY();

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

  /**
   * sets the card that should be rendered by this view
   * @param  {Card} card the card that should be rendered
   */
  setCard: function(card) {

    if(this.card == undefined)
      this.card = card;
  },

  /**
   * gets the card the view is currently rendering
   * @return {Card} the current card this views is rendering
   */
  getCard: function() {
    return this.card;
  },

  /**
   * sets the x position of the card
   * @param  {int} x position on canvas
   */
  setX: function(x) {
    this.x = x;
  },

  /**
   * sets the y position of the card
   * @param  {int} y position on canvas
   */
  setY: function(y) {
    this.y = y;
  },

  /**
   * gets the x position of the card
   * @return {int} x position of card on canvas
   */
  getX: function() {
    return this.x;
  },

  /**
   * gets the y position of the card
   * @return {int} y position of card on canvas
   */
  getY: function() {
    return this.y;
  },


  getSize: function() {
    return [this.size, this.size * 1.5];
  },

  /**
   * sets the size (width) in pixels, the height is 1,5 the width.
   * when a card is hovorable the card will slighly shrink in size when being hovored
   * @param  {int} size width in pixels
   */
  setSize: function(size) {
    this.size = size;
  },

  /**
   * returns hexadecimal value of the cards colour
   * @return {String} hexadecimal colour
   */
  getColour: function() {
    return this.getCard().getType() == "black" ? '#000' : '#FFF';
  },

  /**
   * Makes rounded rectangle path for certain values
   * @param  {context} ctx   instance of context
   * @param  {int}     x     the x value of the to be made path
   * @param  {int}     y     the y value of the to be made path
   * @param  {Array}   size  the size of the rounded rectangle [width, height]
   * @param  {int}     curve the size of the curve in pixels
   * @private
   */
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

  /**
   * returns this class' instance of ViewManager
   * @return {ViewManager} this class' instance of ViewManager
   * @private
   */
  _getViewManager: function() {
    return this.view_manager;
  },

  /**
   * registers new listener
   * @param  {String}   type     what it has to listen for
   * @param  {Function} callback function to be called when even triggers
   * @return {Array}    can be used to unregister callback with the function 'off'
   */
  on: function(type, callback) {
    this.listeners[type].push(callback);
    return [type, this.listeners[type].length-1];
  },

  /**
   * will delete listener from code
   * @param  {Array} code describes which listener to delete
   */
  off: function(code) {
    this.listeners[code[0]][code[1]] = function(){};
  }
}
