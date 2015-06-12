/**
 * manages the main page's content
 * @type {Object}
 * @name ViewManager
 */
var ViewManager = {

  /**
   * local instance of Client
   * @type {Client}
   * @private
   */
  app: undefined,

  /**
   * history of all the main views to have been on screen
   * @type {Array}
   * @private
   */
  view_history: [],

  /**
   * the current main view
   * @type {View}
   * @private
   */
  current_view: undefined,

  /**
   * Object of all the cached templates (name=>template)
   * @type {Object}
   * @private
   */
  templates: {},

  /**
   * Initalizes an instance of ViewManager
   * @param  {Client}   app      the app running this instance of ViewManager
   * @param  {Function} callback callback to be called when done initializing
   */
  initialize: function(app, callback) {
    this.app = app;
    this.view_history = [];

    this._cacheAllTemplates(callback);
  },

  /**
   * returns an instance of this viewManager's Client
   * @return {Client} the current instance of Client
   */
  getApp: function() {
    return this.app;
  },

  /**
   * downloads all the HTML template files and caches them
   * @param  {Function} callback the function to be called when done
   * @private
   */
  _cacheAllTemplates: function(callback) {
    var self = this;
    var m = self.getMustache();

    var length = $('[type="x-tmpl-mustache"]').length;
    var i = 0;

    $('[type="x-tmpl-mustache"]').each(function() {
      var _element = this;

      $.ajax({
        url: $(_element).attr("src"),
      }).done(function(data) {
        i++;

        self.templates[$(_element).attr("name")] = data;
        m.parse(data);

        console.log("Loaded template: " + $(_element).attr("name"));

        if(i >= length) {
          self.setView(Object.create(LoginView));

          callback();
        }
      });

    });

  },

  /**
   * sets the current main view and saves the old one
   * @param  {View} view the view to be set as main view
   */
  setView: function(view, arguments) {
    if(this.getCurrentView() != undefined) {
      this.view_history.push(this.getCurrentView());
    }

    this.current_view = view;
    this.getCurrentView().initialize(this.getApp(), arguments);
  },

  /**
   * sets the current content of the main page
   * @param  {String} content  the content to be set
   */
  setContent: function(content) {
    if(content in this.templates) {
      content = this.getTemplate(content);
    }
    this._currentContent = content;
    $("#content").html(content);
  },

  /**
   * gets the current context if the current view has a canvas in the DOM
   * @return {context} the current context
   */
  getContext: function() {
    return this.isCanvasVisible() ? this.getCanvasView().getContext() : false;
  },

  /**
   * gets the canvas if the current view has a canvas in the DOM
   * @return {element} the canvas element
   */
  getCanvas: function() {
    return this.isCanvasVisible() ? this.getCanvasView().getCanvas() : false;
  },

  /**
   * returns the instance of the current main view
   * @return {View} current main view
   */
  getCurrentView: function() {
    return this.current_view;
  },

  /**
   * returns an instance of the Mustache rendering engine
   * @return {Mustache} an instance of the mustache rendering engine
   */
  getMustache: function() {
    return Mustache;
  },

  /**
   * gets a template by name
   * @param  {string} name the template's name
   * @return {string}      the template
   */
  getTemplate: function(name) {
    return this.templates[name];
  },

  /**
   * returns the canvas view manager
   * @return {CanvasViewManager} the current CanvasViewManager
   */
  getCanvasView: function() {
    return this.canvas_view;
  },

  /**
   * Checks if the current views has a canvas enabled
   * @return {boolean} if the canvas object is visible
   */
  isCanvasVisible: function() {
    if("hasCanvas" in this.getCurrentView()) {
      return this.getCurrentView().hasCanvas();
    } else {
      return false;
    }
  }

}
