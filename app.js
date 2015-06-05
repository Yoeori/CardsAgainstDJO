var express = require("express");
var http = require("http");
var fs = require("fs");

var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);

if(!fs.existsSync("./config.json")) {
  console.error("Error: Configuration file doesn't exist.");
  process.exit();
}

var config = require("./config");

if (typeof config["database"]["host"] == 'undefined' ||
    typeof config["database"]["user"] == 'undefined' ||
    typeof config["database"]["password"] == 'undefined' ||
    typeof config["database"]["database"] == 'undefined' ||
    typeof config["port"] == 'undefined') {

  console.error("Error: Configuration file is incomplete.");
  process.exit();
}

app.use(express.static('static'));
app.use("/js", express.static('client'));
app.use("/js", express.static('shared'));
app.use("/views", express.static('client/views/html'));

/*
TODO implement minifier
var UglifyJS = require("uglify-js");
var result = UglifyJS.minify(["client/client.js", "client/packet_manager.js"]);
console.log(result.code);
*/

port = config["port"];

server.listen(port, function() {
  console.log("Server listening at: *:"+port);
});

var game = Object.create(require("./server/app"));
game.initialize(io, config);
