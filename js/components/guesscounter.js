var React = require('react');

var GuessCounter = function(props) {
  return (
  	<p>Guess #<span id="count">{props.guessNum}</span>!</p>
  )
};

var GuessCountTotal = function(props) {
  return (
  	<p>Guessed after <span id="count">{props.guessNum}</span> attempts.</p>
  )
};

module.exports.guessCounter = GuessCounter;
module.exports.guessCountTotal = GuessCountTotal;