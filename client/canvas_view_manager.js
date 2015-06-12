var CanvasViewManager = {

  /**
   * current running game
   * @type {App}
   * @private
   */
  app: undefined,

  /**
   * current main view manager
   * @type {ViewManager}
   * @private
   */
  view_manager: undefined,

  /**
   * Holds current canvas
   * @type {element}
   * @private
   */
  canvas: undefined,

  /**
   * Holds the context of the canvas
   * @type {Context}
   * @private
   */
  ctx: undefined.

  /**
   * if it should update and render the canvas
   * @type {Boolean}
   */
  is_running: true,

  /**
   * Initializes class
   * @param  {App}     app    the current running app
   * @param  {element} canvas a canvas element
   */
  initialize: function(app, canvas) {
    this.app = app;
    this.view_manager = app.getViewManager();

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  },

  render: function() {
    //TODO
  },

  /**
   * grabs the main view manager instance
   * @return {ViewManager} the main running view manager
   */
  getMainViewManager: function() {
    return this.view_manager;
  },

  /**
   * adds the view to  the stack to be rendered
   * @param  {CanvasView} view an instance of a CanvasView object
   * @return {int}        id to be used when removed from stack
   */
  addView: function(view) {
    //TODO
  },

  shouldRender: function() {
    return this.is_running == true;
  },

  shouldUpdate: function() {
     return this.is_running == true;
  },



}
