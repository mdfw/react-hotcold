const express = require('express');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const Storage = {
  updateTo: function updateTo(numguesses, force = false) {
    if (numguesses < this.fewest || force) {
      this.fewest = numguesses;
    }
    return numguesses;
  },
};

const createStorage = function createStorage() {
  const storage = Object.create(Storage);
  storage.fewest = 42;
  return storage;
};

const storage = createStorage();

const app = express();
app.use(express.static('build'));


//eslint gives the following error:
//27:20  error  Unexpected function expression  prefer-arrow-callback
app.get('/fewest', function fewestGet(request, response) {
  response.json({ fewest: storage.fewest });
});

//eslint gives the following error:
//31:33  error  Unexpected function expression  prefer-arrow-callback
app.post('/fewest', jsonParser, function fewestPost(request, response) {
  if (request.body.numguesses === '') {
    return response.sendStatus(400);
  }

  const newcount = storage.updateTo(request.body.numguesses, request.body.force);
  return response.status(201).json(newcount);
});

app.listen(process.env.PORT || 3000, process.env.IP);

