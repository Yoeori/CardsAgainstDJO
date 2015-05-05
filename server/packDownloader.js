var https = require("https");
var cards;

module.exports = function(code, callback) {
  var url = "https://api.cardcastgame.com/v1/decks/" + code + "/cards";

  https.get(url, function(res) {
    var body = "";

    res.on("data", function(chunk) {
      body += chunk;
    });

    res.on("end", function() {
      cards = JSON.parse(body);
      var err;
      if (cards["id"] == "not_found") {
        err = {message: "Error: Cardcast not found at " + code, type: 1};
        callback(null, err);
      } else {
        deleteCards("calls", "id");
        deleteCards("calls", "created_at");
        deleteCards("responses", "id");
        deleteCards("responses", "created_at");
        fixSyntax("calls", true);
        fixSyntax("responses", false);
        getInfo(code, function(info) {
          var deleteArray = [
            "unlisted",
            "created_at",
            "updated_at",
            "external_copyright",
            "copyright_holder_url",
            "category",
            "author",
            "call_count",
            "response_count"
          ];
          for (var q = 0; q < deleteArray.length; q++) {
            delete info[deleteArray[q]];
          }
          var outputJSON = {
            "info": info,
            "cards": cards
          }
          callback(JSON.stringify(outputJSON, null, 2));
        });
      }
    });
  }).on("error", function(e) {
    console.error(e);
  });
}

function getInfo(code, callback) {
  var url = "https://api.cardcastgame.com/v1/decks/" + code;

  https.get(url, function(res) {
    var body = "";
    res.on("data", function(chunk) {
      body += chunk;
    });
    res.on("end", function() {
      info = JSON.parse(body);
      callback(info);
    });
  }).on("error", function(e) {
    console.error(e);
    callback(null);
  });
}

function deleteCards(array, item) {
  for (var i = 0; i < cards[array].length; i++) {
    delete cards[array][i][item];
  }
}

function fixSyntax(type, countAnswers) {
  for (var i = 0; i < cards[type].length; i++) {
    var texts = cards[type][i]["text"];
    delete cards[type][i]["text"];
    var newText = "";
    for (var x = 0; x < texts.length; x++) {
      if (x == 0 || texts[x] == "") {
        newText += texts[x];
      } else {
        newText += "_" + texts[x];
      }
    }
    cards[type][i]["text"] = newText;
    if(countAnswers) {
      cards[type][i]["answers"] = texts.length - 1;
    }
  }
};
