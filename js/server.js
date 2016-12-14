var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = {
	updateTo: function(numguesses) {
		if (numguesses < this.fewest) {
			this.fewest = numguesses;
		}
    return numguesses;
    } 
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.fewest = 42;
  return storage;
}

var storage = createStorage();

var app = express();
app.use(express.static('build'));


app.get('/fewest', function(request, response) {
    response.json({fewest:storage.fewest});
});

app.post('/fewest', jsonParser, function(request, response) {
  console.log("posting fewest: ")
  console.dir(request.body)
  if (request.body.numguesses === '') {
      return response.sendStatus(400);
  }

  var newcount = storage.updateTo(request.body.numguesses);
  console.log("New fewest: " + newcount)
  response.status(201).json(newcount);
});

app.listen(process.env.PORT || 3000, process.env.IP,  function () {
  console.log('Example app listening on port 3000!')
});

