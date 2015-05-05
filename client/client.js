

var App = {

  user: undefined,
  socket: undefined,
  view: undefined,


  initialize: function() {
    this.socket = io();

    this.user = Object.create(UserModel);
    this.user.initialize(this, this.socket);

    this.setView(PageUsernameView);
  },

  getUser: function() {
    return this.user;
  },

  setView: function(view) {
    if(this.view != undefined) {
      this.view.onDie();
    }

    this.view = Object.create(view);
    this.view.initialize(this);
  },

  getSocket: function() {
    return this.socket;
  }

}

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
