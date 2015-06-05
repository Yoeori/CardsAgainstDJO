var Router = ControllersRouter;

var PacketManager = {

  app: undefined,
  socket: undefined,
  router: undefined,

  initialize: function(app) {

    this.app = app;

    //Set up packet router
    this.router = Object.create(Router);
    this.router.initialize(this.getApp());

    this.socket = this.getApp().getSocket();

  },

  handlePacket: function(packet_name, socket, data) {
    this.getRouter().route(packet_name, data);
  },

  sendPacket: function(packet_name, data) {
    this.getSocket().emit("game_packet", {
      "packet_name": packet_name,
      "data": data
    });
  },

  getApp: function() {
    return this.app;
  },

  getSocket: function() {
    return this.io;
  },

  getRouter: function() {
    return this.router;
  }

};
