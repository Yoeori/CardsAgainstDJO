var App = {

  socket: undefined,

  viewManager: undefined,
  packetManager: undefined,

  initialize: function(callback) {
    this.socket = io();

    this.packetManager = Object.create(PacketManager);
    this.packetManager.initialize(this);

    this.viewManager = Object.create(ViewManager);
    this.viewManager.initialize(this, function() {
      //this.user = Object.create(User);
      //this.user.initialize(this, this.socket);

      //this.setView(PageUsernameView);

      //this.getController("user").loginPage();
      callback();
    });

  },

  getUser: function() {
    return this.user;
  },

  /*
  setView: function(view) {
    if(this.view != undefined) {
      this.view.onDie();
    }

    this.view = Object.create(view);
    this.view.initialize(this);
  },
  */

  send: function(packet_name, data) {
    this.getPacketManager().sendPacket(packet_name, data);
  },

  getSocket: function() {
    return this.socket;
  },

  getPacketManager: function() {
    return this.packetManager;
  },

  getViewManager: function() {
    return this.viewManager;
  },

  getController: function(name) {
    return this.getPacketManager().getRouter().getController(name);
  },

};

/*
$(window).resize(function() {
  //canvas.height = 500;
  //canvas.width = window.innerWidth;
  //ctx.fillStyle = '#555';
  //ctx.fillRect(0,0,canvas.width,canvas.height);

  //card_white.getView().render(ctx);
  //card_black.getView().render(ctx);

  //drawCard(800, 150, "And Mom's Apple Pie.", "white");
});

$(window).ready(function() {
  $(this).resize();
});
*/
