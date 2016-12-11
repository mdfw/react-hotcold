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
    processGuess: function(guess) {
        this.props.dispatch(
            actions.newGuess(guess) 
        );
    },
    guessInputChange: function(value) {
	    this.props.dispatch(
            actions.guessInputChange(value) 
        );
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
	   	var guessform = <GuessForm guessvalue={this.props.currentguessinput} onChange={this.guessInputChange} onBlur={this.onBlur} onFocus={this.onFocus} placeholderText={this.state.placeholderText} onSubmit={this.processGuess} />
	   	var guessCounter = <GuessCounter guessNum={this.props.guesses.length+1} />
	   	
	   	if (this.props.basefeedback === constants.BASE_CORRECT) {
		   	guessform = <NewGameForm onNewGameSubmit={this.newGameSubmit} />
		   	guessCounter = <GuessCountTotal guessNum={this.props.guesses.length} />
	   	} 

        return (
			<section className="game"> 
				<Feedback basefeedback={this.props.basefeedback} relativefeedback={this.props.relativefeedback} previousguess = {this.props.guesses[this.props.guesses.length -2]} />
				
				{guessform}
				
	      		{guessCounter}
				
				{guesslist}
	
			</section>
        );
    }
});


/*** Subcomponents **/
var Feedback = function(props) {
	return <h2 id="feedback">{textForFeedback(props)}</h2>
};

function textForFeedback(props) {
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
};

var GuessForm = React.createClass({
    formSubmit: function(e) {
		e.preventDefault();
	    var guess = this.refs.guessinput.value;
        this.props.onSubmit(guess);
    },
    onChange: function(e) {
	    this.props.onChange(e.target.value);
    },
    render: function() {
	    return (
		    <div>
			<form onSubmit={this.formSubmit}>
				<input type="text" name="userGuess" id="userGuess" className="text" maxLength="3" autoComplete="off" placeholder={this.props.placeholderText} required onFocus={ this.props.onFocus } onBlur={ this.props.onBlur } onChange={this.onChange} value={this.props.guessvalue} ref="guessinput" />
				<input type="submit" id="guessButton" className="button" name="submit" value="Guess"/>
			</form>
			</div>
		);
	}
});

var NewGameForm = React.createClass({
	formSubmit: function(e) {
		e.preventDefault();
		this.props.onNewGameSubmit();		
	},
	render: function() {
		return (
			<form onSubmit={this.formSubmit}>
				<input type="text" name="userGuess" id="userGuess" className="text" maxLength="3" autoComplete="off" placeholder={this.props.placeholderText} disabled />
				<input type="submit" id="guessButton" className="button" name="submit" value="New Game"/>
			</form>
		)
	}
});

var GuessCounter = function(props) {
    return (
    	<p>Guess #<span id="count">{props.guessNum}</span>!</p>
    );
};

var GuessCountTotal = function(props) {
    return (
    	<p>Guessed after <span id="count">{props.guessNum}</span> attempts.</p>
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
};

var Guess = function(props) {
    return (
        <li>{props.text}</li>
    );
};

/** redux store map **/
var mapStateToProps = function(state, props) {
    return {
       basefeedback: state.basefeedback,
       relativefeedback: state.relativefeedback,
       guesses: state.guesses,
       currentguessinput: state.currentguessinput
    };
};


var Container = connect(mapStateToProps)(Game);

module.exports = Container;