var Router = require("./controllers_router.js");

module.exports = {

  app: undefined,
  io: undefined,
  router: undefined,

  sockets: [],

  initialize: function(app) {
    var self = this;

    this.app = app;

    //Set up packet router
    this.router = Object.create(Router);
    this.router.initialize(this.getApp());

    //Setup IO instance
    this.io = this.getApp().getIO();
    this.sockets;

    this.getIO().on("connection", function(socket) {
      self.registerSocket(socket);
    });

  },

  handlePacket: function(packet_name, socket, data) {
    this.getRouter().route(packet_name, socket, data);
  },

  sendPacket: function(packet_name, data) {
    this.sendPacketToSockets(packet_name, [this.getIO().sockets], data);
  },

  sendPacketToSocket: function(packet_name, socket, data) {
    this.sendPacketToSockets(packet_name, [socket], data)
  },

  sendPacketToSockets: function(packet_name, sockets, data) {
    if(typeof sockets != 'Array') {
      sockets = [sockets];
    }

    for(var i = 0; i < sockets.length; i++) {
      sockets[i].emit("game_packet", {
        name: packet_name,
        data: data
      });
    }

  },

  getApp: function() {
    return this.app;
  },

  getIO: function() {
    return this.io;
  },

  getRouter: function() {
    return this.router;
  },

  registerSocket: function(socket) {
    var self = this;

    console.log("New socket connected "+ socket.conn.remoteAddress);

    var id = this.sockets.length;
    this.sockets.push(socket);

    socket.on("game_packet", function(packet) {
      self.handlePacket(packet.name, socket, packet.data);
    });

    socket.on("disconnect", function() {
      console.log("user "+ socket.conn.remoteAddress + " " + (socket.user ? '(' +socket.user.getUsername()+ ') ': '') + "has disconnected from the server.");
      self.sockets.splice(id, 1);
    });
  },

  die: function() {
    this.getIO().removeAllListeners("game_packet");
  },

};
