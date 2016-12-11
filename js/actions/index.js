var MIN_TARGET = 1
var MAX_TARGET = 100


function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

var createTargetNumber = function() {
	return randomIntFromInterval(MIN_TARGET,MAX_TARGET);
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

exports.MIN_TARGET = MIN_TARGET;
exports.MAX_TARGET = MAX_TARGET;
exports.createTargetNumber = createTargetNumber;

exports.GUESS_INPUT_CHANGE = GUESS_INPUT_CHANGE;
exports.guessInputChange = guessInputChange;

exports.RESET_GAME = RESET_GAME;
exports.resetGame = resetGame;

exports.NEW_GUESS = NEW_GUESS;
exports.newGuess = newGuess;
