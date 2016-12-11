var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/index');
var constants = require('../constants.js');

var PLACEHOLDER_TEXT = "Enter your Guess";

var Game = React.createClass({
	getInitialState: function() {
        return {
            placeholderText: PLACEHOLDER_TEXT
        }
    },
    onFocus: function() {
	    this.setState({
		    placeholderText:""
	    })
    },
    onBlur: function() {
	    this.setState({
		    placeholderText: PLACEHOLDER_TEXT
	    })

    },
    processGuess: function(e) {
	    var guess = this.refs.guessinput.value;
	    console.log("Got a guess: " + guess);
        this.props.dispatch(
            actions.newGuess(guess) 
        );
		e.preventDefault();

    },
    render: function() {
	   var guesslist = null;
	   if (this.props.guesses.length > 0) {
		   guesslist = <Guesslist guesses={this.props.guesses} />;
	   }
	    console.log("Rendering game with: ");
	    console.dir(this.props)
        return (
			<section className="game"> 
				<Feedback basefeedback={this.props.basefeedback} relativefeedback={this.props.relativefeedback} previousguess = {this.props.guesses[this.props.guesses.length -1]} />
				
				<form onSubmit={this.processGuess}>
					<input type="text" name="userGuess" id="userGuess" className="text" maxLength="3" autoComplete="off" placeholder={this.state.placeholderText} required onFocus={ this.onFocus } onBlur={ this.onBlur } ref="guessinput" />
	      			<input type="submit" id="guessButton" className="button" name="submit" value="Guess"/>
				</form>
				
	      		<p>Guess #<span id="count">{this.props.guesses.length+1}</span>!</p>
				
				{guesslist}
	
			</section>
        );
    }
});


/*** Subcomponents **/
var Feedback = function(props) {
	return <h2 id="feedback">{textForFeedback(props)}</h2>
}

function textForFeedback(props) {
	console.log("getting text for feedback for");
	console.dir(props);
	var text = "Make your guess!";
	switch (props.basefeedback) {
		case constants.VALIDATION_ERROR_NOGUESS: 
			text = "Please enter a guess."
			break;
		case constants.VALIDATION_ERROR_NAN: 
			text = "Guess should be a number."
			break;
		case constants.VALIDATION_ERROR_OUTOFBOUNDS: 
			text = "Guess should be between " +  actions.MIN_TARGET +" and " + actions.MAX_TARGET + "."
			break;
		case constants.BASE_BEGIN: 
			text = "Make your guess!"
			break;
		case constants.BASE_CORRECT: 
			text = "Correct!"
			break;
		case constants.BASE_ICECOLD: 
			text = "Ice cold"
			break;
		case constants.BASE_COLD: 
			text = "Cold"
			break;
		case constants.BASE_WARM: 
			text = "Warm"
			break;
		case constants.BASE_HOT: 
			text = "Hot"
			break;
		case constants.BASE_SUPERHOT: 
			text = "Super hot"
			break;
		case constants.BASE_HRM: 
			text = "Hrm..."
	}
	if (!props.relativefeedback || !props.previousguess) {
		return text;
	}
	switch (props.relativefeedback) {
		case constants.RELATIVE_WARMER: 
			text = text + ", warmer than " + props.previousguess + ".";
			break;
		case constants.RELATIVE_COOLER: 
			text =  text + ", cooler than " + props.previousguess + ".";
	}
	return text;
}

var Guess = function(props) {
    return (
        <li>{props.text}</li>
    );
};

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
}

/** redux store map **/
var mapStateToProps = function(state, props) {
    return {
       basefeedback: state.basefeedback,
       relativefeedback: state.relativefeedback,
       guesses: state.guesses
    };
};


var Container = connect(mapStateToProps)(Game);

module.exports = Container;