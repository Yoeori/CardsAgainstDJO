var express = require("express");
var http = require("http");

var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);

app.use(express.static('static'));
app.use("/js", express.static('client'));
app.use("/js", express.static('shared'));

server.listen(3003, function() {
  console.log("Server listening at: *:3000");
});

var game = Object.create(require("./server/app"));
game.initialize(io);
