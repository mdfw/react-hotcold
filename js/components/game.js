var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/index');

var Game = React.createClass({
	getInitialState: function() {
        return {
            placeholderText: "Enter your Guess"
        }
    },
    onFocus: function() {
	    this.setState({
		    placeholderText:""
	    })
    },
    onBlur: function() {
	    this.setState({
		    placeholderText:"Enter your Guess"
	    })

    },
    processGuess: function(e) {
	    e.preventDefault();
	    var guess = this.refs.guessinput.value;
	    console.log("Got a guess: " + guess);
        this.props.dispatch(
            actions.newGuess(guess) 
        );
    },
    render: function() {
	   	var guesslist = [];
	    let guesslen = this.props.guesses.length;
        for (var i=0; i<guesslen; i++) {
            guesslist.push(<Guess text={this.props.guesses[i]}/>);
        }

	    console.log("Rendering game with: ");
	    console.dir(this.props)
        return (
			<section className="game"> 
				
				<h2 id="feedback">{this.props.gamefeedback}</h2>
	
				<form onSubmit={this.processGuess}>
					<input type="text" name="userGuess" id="userGuess" className="text" maxLength="3" autoComplete="off" placeholder={this.state.placeholderText} required onFocus={ this.onFocus } onBlur={ this.onBlur } ref="guessinput" />
	      			<input type="submit" id="guessButton" className="button" name="submit" value="Guess"/>
				</form>
				
	      		<p>Guess #<span id="count"></span>!</p>
				
				<ul id="guessList" className="guessBox clearfix">
					{guesslist}
				</ul>
	
			</section>
        );
    }
});

var Guess = function(props) {
    return (
        <li>{props.guess}</li>
    );
};


var mapStateToProps = function(state, props) {
	console.log("mapping state to props. State: ")
	console.dir(state)
	console.dir(props)
    return {
        guesses: state.guesses,
        gamefeedback: state.gamefeedback
    };
};


var Container = connect(mapStateToProps)(Game);

module.exports = Container;