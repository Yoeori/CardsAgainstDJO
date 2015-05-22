var express = require("express");
var http = require("http");
var fs = require("fs");

var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);

var config;

if(fs.existsSync("./server/config.json")) {
	config = require("./server/config");
	if (typeof config["database"]["host"] == 'undefined') {
		incompleteConfigExit();
	}
	if (typeof config["database"]["user"] == 'undefined') {
		incompleteConfigExit();
	}
	if (typeof config["database"]["password"] == 'undefined') {
		incompleteConfigExit();
	}
	if (typeof config["database"]["database"] == 'undefined') {
		incompleteConfigExit();
	}
	if (typeof config["port"] == 'undefined') {
		incompleteConfigExit();
	}
} else {
	console.error("Error: Configuration file doesn't exist.");
	process.exit();
}

function incompleteConfigExit() {
	console.error("Error: Configuration file is incomplete.");
	process.exit();
}

app.use(express.static('static'));
app.use("/js", express.static('client'));
app.use("/js", express.static('shared'));
app.use("/views", express.static('client/views/html'));

port = config["port"];

server.listen(port, function() {
  console.log("Server listening at: *:"+port);
});

var game = Object.create(require("./server/app"));
game.initialize(io, config);
