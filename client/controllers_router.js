var ControllersRouter = {

    controllers: {},

    app: undefined,

    initialize: function(app) {
      this.app = app;

      for(var controller in this.controllers) {
        this.controllers[controller].initialize(this.getApp());
      }

    },

    registerController: function(name, controller) { //static function
      this.controllers[name] = controller;

      var app;

      if(app = this.getApp())
        this.controllers[name].initialize(app);
    },

    getApp: function() {
      return this.app;
    },

    getController: function(name) {
      return this.controller[name];
    },

    route: function(name, data) {
      if(name == "game#test") return this.controllers["game"].test(data);
      if(name == "user#register_error") return this.controllers["user"].register_error(data);

      console.error("catched packet with invalid name: " + name + ".");

    }
};
