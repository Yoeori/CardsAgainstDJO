var Router = ControllersRouter;

var PacketManager = {

  app: undefined,
  socket: undefined,
  router: undefined,

  initialize: function(app) {
    var self = this;

    this.app = app;

    //Set up packet router
    this.router = Object.create(Router);
    this.router.initialize(this.getApp());

    this.socket = this.getApp().getSocket();
    this.socket.on("game_packet", function(packet) {
      self.handlePacket(packet.name, packet.data);
    });

  },

  handlePacket: function(packet_name, data) {
    this.getRouter().route(packet_name, data);
  },

  sendPacket: function(packet_name, data) {
    this.getSocket().emit("game_packet", {
      name: packet_name,
      data: data
    });
  },

  getApp: function() {
    return this.app;
  },

  getSocket: function() {
    return this.socket;
  },

  getRouter: function() {
    return this.router;
  }

};
