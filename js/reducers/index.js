var actions = require('../actions/index');
var constants = require('../constants.js');

// The main reducer. Looks for the action and makes decisions.
var hotcoldReducer = function(state = createNewState(), action) {
	switch(action.type) {
		case actions.GUESS_INPUT_CHANGE:
			var newstate = Object.assign({}, state);
			newstate.currentguessinput = action.guessinput
			return newstate;
			break;
		
		case actions.NEW_GUESS:
			var newstate = Object.assign({}, state);
			var validated = validateGuess(action.guess);
			if (!validated.valid) {
				newstate.basefeedback = validated.errormsg;
				newstate.relativefeedback = null;
			} else {
				newstate.basefeedback = baseResponseFromGuess(state.target, validated.parsedGuess);
				var lastguess = state.guesses[state.guesses.length -1];
				newstate.relativefeedback = relativeResponseFromGuess(validated.parsedGuess, lastguess, state.target);
				newstate.currentguessinput = "";
				newstate.guesses = newstate.guesses.concat(validated.parsedGuess);
			}
			return newstate;
			break;
			
		case actions.FETCH_FEWEST_SUCCESS:
		  console.log("got new fewest for state: " + action.fewest);
			var newstate = Object.assign({}, state);
			newstate.fewestguesses = action.fewest;
      return newstate;
      
		case actions.RESET_GAME:
			return createNewState(action.newtarget, state.fewestguesses);
			break;
	}
    return state;
};


function createNewState(newtarget, fewest) {
	var theTarget = newtarget;
	if (!theTarget) {
		theTarget = actions.createTargetNumber();
	}
	var few = -1;
	if (fewest) {
		few = fewest;
	}

	return {
		target:theTarget,
		guesses: [],
		basefeedback: constants.BASE_BEGIN,
		relativefeedback: "",
		currentguessinput: "",
		fewestguesses: few
	}
}

var validateGuess = function(guess) {
	var validate = {
		valid: true,
		errormsg: "",
		parsedguess: NaN
	}
	if (!guess) {
		validate.valid = false;
		validate.errormsg = constants.VALIDATION_ERROR_NOGUESS;
		return validate;
	}
	var parsedGuess = parseInt(guess);
	if (isNaN(parsedGuess)) {
		validate.valid = false;
		validate.errormsg = constants.VALIDATION_ERROR_NAN;
		return validate;
	} 
	if (parsedGuess < 1 || parsedGuess > 100) {
		validate.valid = false;
		validate.errormsg = constants.VALIDATION_ERROR_OUTOFBOUNDS;
		return validate;
	}
	validate.parsedGuess = parsedGuess;
	return validate;
}


/* Returns Very cold, cold, hot and very hot */
var baseResponseFromGuess = function(target, guess) {
	if (target == guess) {
		return constants.BASE_CORRECT;
	}
	var distance = Math.abs(target - guess);
	if (distance > 50) {
	 	return constants.BASE_ICECOLD;
	} else if (distance > 30) {
		return constants.BASE_COLD;
	} else if (distance > 20) {
		return constants.BASE_WARM;
	} else if (distance > 10) {
		return constants.BASE_HOT;
	} else {
		return constants.BASE_SUPERHOT;
	}
	return constants.BASE_HRM;
}

/* Returns "hotter than X" or "colder than x" */
var relativeResponseFromGuess = function (thisGuess, lastGuess, target) {
	if (!lastGuess || thisGuess == target) {
		return null;
	}
	if (lastGuess === thisGuess) {
		return constants.RELATIVE_SAMEAS;
	}
	var currentDistance = Math.abs(target - thisGuess);
	var previousDistance = Math.abs(target - lastGuess);
	if (currentDistance > previousDistance) {
		return constants.RELATIVE_COOLER;
	} else {
		return constants.RELATIVE_WARMER;
	}
	return null;
}


exports.hotcoldReducer = hotcoldReducer;


