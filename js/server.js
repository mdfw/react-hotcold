var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = {
	updateTo: function(guess) {
		if (guess < this.fewest) {
			this.fewest = guess;
		}
    return guess;
    } 
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.fewest = 50;
  return storage;
}

var storage = createStorage();

var app = express();

app.get('/', function(request, response) {
    response.send("Hello World");
});

app.get('/fewest', function(request, response) {
    response.json({fewest:storage.fewest});
});

app.post('/fewest', jsonParser, function(request, response) {
    if (!('guesses' in request.body)) {
        return response.sendStatus(400);
    }

    var fewest = storage.updateTo(request.body.guesses);
    response.status(201).json(fewest);
});

app.listen(process.env.PORT || 3000, process.env.IP);