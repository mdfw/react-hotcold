const fetch = require('isomorphic-fetch');
const constants = require('../constants.js');

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const createTargetNumber = function createTargetNumber() {
  return randomIntFromInterval(constants.MIN_TARGET, constants.MAX_TARGET);
};

const GUESS_INPUT_CHANGE = 'GUESS_INPUT_CHANGE';
const guessInputChange = function guessInputChange(guessinput) {
  return {
    type: GUESS_INPUT_CHANGE,
    guessinput: guessinput,
  };
};

const NEW_GUESS = 'NEW_GUESS';
const newGuess = function newGuess(guess) {
  return {
    type: NEW_GUESS,
    guess: guess,
  };
};

const RESET_GAME = 'RESET_GAME';
const resetGame = function resetGame() {
  return {
    type: RESET_GAME,
    newtarget: createTargetNumber(),
  };
};

const FETCH_FEWEST_SUCCESS = 'FETCH_FEWEST_SUCCESS';
const fetchFewestSuccess = function fetchFewestSuccess(fewest) {
  return {
    type: FETCH_FEWEST_SUCCESS,
    fewest: fewest,
  };
};

const FETCH_FEWEST_ERROR = 'FETCH_FEWEST_ERROR';
const fetchFewestError = function fetchFewestError(error) {
  return {
    type: FETCH_FEWEST_ERROR,
    error: error,
  };
};

const fetchFewest = function fetchFewest() {
  return function (dispatch) {
    const url = 'http://localhost:3000/fewest';
    return fetch(url).then(function (response) {
      if (response.status < 200 || response.status >= 300) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const fewest = data.fewest;
      return dispatch(
        fetchFewestSuccess(fewest)
      );
    })
    .catch(function (error) {
      //TODO: We don't actually do anything with this error.
      return dispatch(
        fetchFewestError(error)
      );
    });
  };
};

const postFewest = function postFewest(newfewest) {
  return function (dispatch) {
    const url = 'http://localhost:3000/fewest';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numguesses: newfewest,
      })
    }).then(function () {
      return dispatch(
        fetchFewest()
      );
    });
    //TODO: no error handling
  };
};

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

