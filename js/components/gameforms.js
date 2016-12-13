var React = require('react');

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
	)
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

module.exports.guessForm = GuessForm;
module.exports.newGameForm = NewGameForm;