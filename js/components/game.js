var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/index');
var constants = require('../constants.js');

/* Subcomponents */
var Feedback = require('./gamefeedback.js');
var GuessForm = require('./gameforms.js').guessForm;
var NewGameForm = require('./gameforms.js').newGameForm;
var GuessCounter = require('./guesscounter.js').guessCounter;
var GuessCountTotal = require('./guesscounter.js').guessCountTotal;
var Guesslist = require('./guesslist.js');

/* Constants */
var PLACEHOLDER_TEXT = "Enter your Guess";

/* Main react class */
var Game = React.createClass({
  componentDidMount: function() {
		console.log("console did mount");
		console.dir(this.props);
		if (this.props.fewest == -1) {
			this.props.dispatch(
				actions.fetchFewest()
			)
		}
	},
	getInitialState: function() {
    return ({placeholderText: PLACEHOLDER_TEXT})
  },
  onFocus: function() {
    this.setState({placeholderText:""})
  },
  onBlur: function() {
    this.setState({placeholderText: PLACEHOLDER_TEXT})
  },
  processGuess: function(guess) {
    this.props.dispatch(
      actions.newGuess(guess) 
    )
  },
  guessInputChange: function(value) {
    this.props.dispatch(
      actions.guessInputChange(value) 
    )
  },
  newGameSubmit: function() {
    this.props.dispatch (
	    actions.resetGame()
    )
  },
  render: function() {
    var guesslist = null;
    if (this.props.guesses.length > 0) {
      guesslist = <Guesslist guesses={this.props.guesses} />;
    }
    
   	var guessform = <GuessForm guessvalue={this.props.currentguessinput} 
   	                           onChange={this.guessInputChange} 
   	                           onBlur={this.onBlur} 
   	                           onFocus={this.onFocus} 
   	                           placeholderText={this.state.placeholderText} 
   	                           onSubmit={this.processGuess} 
   	                           />
   	                           
   	var guessCounter = <GuessCounter guessNum={this.props.guesses.length+1} />
   	
   	if (this.props.basefeedback === constants.BASE_CORRECT) {
	   	guessform = <NewGameForm onNewGameSubmit={this.newGameSubmit} />
	   	guessCounter = <GuessCountTotal guessNum={this.props.guesses.length} />
   	} 

    return (
		  <section className="game"> 
			  <Feedback basefeedback={this.props.basefeedback} 
			            relativefeedback={this.props.relativefeedback} 
			            previousguess = {this.props.guesses[this.props.guesses.length -2]} 
			            fewest={this.props.fewest} 
			            />
			
        {guessform}
			
        {guessCounter}
			
        {guesslist}

      </section>
      );
  }
});

/** redux store map **/
var mapStateToProps = function(state, props) {
  return {
     basefeedback: state.basefeedback,
     relativefeedback: state.relativefeedback,
     guesses: state.guesses,
     currentguessinput: state.currentguessinput,
     fewest: state.fewestguesses
  };
};


var Container = connect(mapStateToProps)(Game);

module.exports = Container;