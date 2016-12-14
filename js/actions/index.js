require('isomorphic-fetch');
var store = require('../store');
var constants = require('../constants.js');

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

var createTargetNumber = function() {
	return randomIntFromInterval(constants.MIN_TARGET, constants.MAX_TARGET);
}

var GUESS_INPUT_CHANGE = 'GUESS_INPUT_CHANGE'
var guessInputChange = function(guessinput) {
	return {
		type: GUESS_INPUT_CHANGE,
		guessinput: guessinput
	}
}

var NEW_GUESS = 'NEW_GUESS'
var newGuess = function(guess) {
	return {
		type: NEW_GUESS,
		guess: guess
	}
}

var RESET_GAME = 'RESET_GAME'
var resetGame = function () {
	return {
		type: RESET_GAME,
		newtarget: createTargetNumber()
	}
}

var FETCH_FEWEST_SUCCESS = 'FETCH_FEWEST_SUCCESS';
var fetchFewestSuccess = function(fewest) {
    return {
        type: FETCH_FEWEST_SUCCESS,
        fewest: fewest
    };
};

var FETCH_FEWEST_ERROR= 'FETCH_FEWEST_ERROR';
var fetchFewestError = function(error) {
    return {
        type: FETCH_FEWEST_ERROR,
        error: error
    };
};

var fetchFewest = function() {
    return function(dispatch) {
      var url = 'http://localhost:3000/fewest' ;
      return fetch(url).then(function(response) {
        if (response.status < 200 || response.status >= 300) {
          var error = new Error(response.statusText)
          error.response = response
          throw error;
        }
        return response;
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var fewest = data.fewest;
        return dispatch(
          fetchFewestSuccess(fewest)
        );
      })
      .catch(function(error) {
        //TODO: We don't actually do anything with this error.
        return dispatch(
          fetchFewestError(error)
        );
      });
    }
};

var postFewest = function(newfewest) {
	return function(dispatch) {
    var url = 'http://localhost:3000/fewest'
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
  			},
			body: JSON.stringify({
				numguesses: newfewest
			})
		}).then(function(response) {
  		return dispatch(
    		fetchFewest()
  		)
		})
		//TODO: no error handling
	}
}

exports.createTargetNumber = createTargetNumber;

exports.GUESS_INPUT_CHANGE = GUESS_INPUT_CHANGE;
exports.guessInputChange = guessInputChange;

exports.RESET_GAME = RESET_GAME;
exports.resetGame = resetGame;

exports.NEW_GUESS = NEW_GUESS;
exports.newGuess = newGuess;

exports.FETCH_FEWEST_ERROR = FETCH_FEWEST_ERROR;
exports.FETCH_FEWEST_SUCCESS = FETCH_FEWEST_SUCCESS;
exports.fetchFewest = fetchFewest;
exports.postFewest = postFewest;

