var express = require("express");
var http = require("http");

var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);

app.use(express.static('static'));
app.use("/js", express.static('client'));
app.use("/js", express.static('shared'));
app.use("/views" express.static('client/views/html'));

port = parseInt(process.argv[process.argv.length-1]) || 3000;

server.listen(port, function() {
  console.log("Server listening at: *:"+port);
});

var game = Object.create(require("./server/app"));
game.initialize(io);
