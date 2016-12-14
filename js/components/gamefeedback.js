var React = require('react');
var constants = require('../constants.js');

/** 
  Feedback component delivers the messaging at the top of the game.
  Requires basefeedback, relativefeedback and previousguess
  **/
var Feedback = function(props) {
  
  function propsToText(props) {
  	var text = "Make your guess!"
  
  	switch (props.basefeedback) {
  		case constants.VALIDATION_ERROR_NOGUESS: 
  			text = "Please enter a guess."
  			break;
  		case constants.VALIDATION_ERROR_NAN: 
  			text = "Guess should be a number."
  			break;
  		case constants.VALIDATION_ERROR_OUTOFBOUNDS: 
  			text = "Guess should be between " +  constants.MIN_TARGET +" and " + constants.MAX_TARGET + "."
  			break;
  		case constants.BASE_BEGIN: 
  			text = "Make your guess!"
        if (props.fewest > 0) {
          text = text + " Lowest score: " + props.fewest + ""
  	    }
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
  			break;
  		case constants.RELATIVE_SAMEAS:
  			text=text + ", same as " + props.previousguess + ". Probably should pick a different number.";
  		}
  	return text;
  };
  
  /* React return */
	return <h2 id="feedback">{propsToText(props)}</h2>
};


module.exports = Feedback;