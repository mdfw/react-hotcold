var actions = require('../actions/index');
var constants = require('../constants.js');

// The main reducer. Looks for the action and makes decisions.
var hotcoldReducer = function(state = createNewState(), action) {
	if (action.type === actions.NEW_GUESS) {
	    var newstate = Object.assign({}, state);
		var validated = validateGuess(action.guess);
		if (!validated.valid) {
			newstate.basefeedback = validated.errormsg;
			newstate.relativefeedback = null;
		} else {
			newstate.basefeedback = baseResponseFromGuess(state.target, validated.parsedGuess);
			var lastguess = state.guesses[state.guesses.length -1];
			newstate.relativefeedback = relativeResponseFromGuess(validated.parsedGuess, lastguess, state.target);
			let newguesses = newstate.guesses;
			newguesses.push(validated.parsedGuess);
			newstate.guesses = newguesses;
		}
		return newstate;
	} else if (action.type == actions.RESET_GAME) {
		return createNewState(action.newtarget);
    } 
    return state;
};


function createNewState(newtarget) {
	var theTarget = newtarget;
	if (!theTarget) {
		theTarget = actions.createTargetNumber();
	}
	console.log("Creating a new state: " + constants.BASE_BEGIN);

	return {
		target:theTarget,
		guesses: [],
		basefeedback: constants.BASE_BEGIN,
		relativefeedback: ""
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
	var currentDistance = Math.abs(target - thisGuess);
	var previousDistance = Math.abs(target - lastGuess);
	if (currentDistance > previousDistance) {
		return constants.RELATIVE_COOLER;
	} else {
		return constants.RELATIVE_WARMER;
	}
	return null;
}

var responseFromGuess = function (base, relative) {
	var responseText = base;
	if (relative) {
		responseText = responseText + ", " + relative;
	}
	return responseText;
}


exports.hotcoldReducer = hotcoldReducer;


