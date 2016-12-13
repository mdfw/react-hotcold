var React = require('react');

var Guesslist = function(props) {
  var guesslist = [];
  let guesslen = props.guesses.length;
  for (var i=0; i<guesslen; i++) {
       guesslist.push(<Guess key={i} text={props.guesses[i]}/>);
  }
  return (
	  <ul id="guessList" className="guessBox clearfix">
		{guesslist}
    </ul>
  )
};

var Guess = function(props) {
  return (
      <li>{props.text}</li>
  )
};

module.exports = Guesslist;
