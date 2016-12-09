/**** Things we should be able to do *****/
/* MAKE A GUESS */
/* GENERATE RANDOM NUMBER */
/* RESET GAME */

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
		type: RESET_GAME
	}
}

exports.RESET_GAME = RESET_GAME;
exports.resetGame = resetGame;

exports.NEW_GUESS = NEW_GUESS;
exports.newGuess = newGuess;
