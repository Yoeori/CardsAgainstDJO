var fs = require("fs");

module.exports = {

  CONTROLLERS_LOCATION: __dirname + "/controllers/",

  controllers: {},

  app: undefined,

  initialize: function(app) {

    this.app = app;

    //Load all controllers
    var controllers_list = fs.readdirSync(this.CONTROLLERS_LOCATION);

    for(var i = 0; i < controllers_list.length; i++) {

      var name = controllers_list[i].replace('_controller.js','');
      this.controllers[name] = Object.create(require(this.CONTROLLERS_LOCATION + controllers_list[i]));
      this.controllers[name].initialize(this.getApp());
      console.info("Loaded controller: " + name);
    }

  },

  getApp: function() {
    return this.app;
  },

  route: function(name, socket, data) {
    if(name == "game#test") return this.controllers["game"].test(socket, data);

    console.error("catched packet with invalid name: [" + name + "]");

  }
};
