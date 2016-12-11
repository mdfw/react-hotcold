var actions = require('../actions/index');


function createNewState(newtarget) {
	var theTarget = newtarget;
	if (!theTarget) {
		theTarget = actions.createTargetNumber();
	}
	return {
		target:theTarget,
		guesses: [],
		gamefeedback: "Make your guess!"
	}
}
/* state: the current state object
	action: the action object 
	returns: a new state object
	*/
var hotcoldReducer = function(state = createNewState(), action) {
	if (action.type === actions.NEW_GUESS) {
	    var newstate = Object.assign({}, state);
		var validated = validateGuess(action.guess);
		if (!validated.valid) {
			newstate.gamefeedback = validated.errormsg;
		} else {
			newstate.gamefeedback = responseFromGuess(baseResponseFromGuess(state.target, validated.parsedGuess), relativeResponseFromGuess(validated.parsedGuess, state.guesses[state.guesses.length -1], state.target));
			let newguesses = newstate.guesses;
			newguesses.push(validated.parsedGuess);
			newstate.guesses = newguesses;
			return newstate;
		}
	} else if (action.type == actions.RESET_GAME) {
		return createNewState(action.newtarget);
    } 
    return state;
};


var validateGuess = function(guess) {
	var validate = {
		valid: true,
		errormsg: "",
		parsedguess: NaN
	}
	if (!guess) {
		validate.valid = false;
		validate.errormsg = "Please enter a guess.";
		return validate;
	}
	var parsedGuess = parseInt(guess);
	if (isNaN(parsedGuess)) {
		validate.valid = false;
		validate.errormsg = "Guess should be a number.";
		return validate;
	} else if (parsedGuess < 1 || parsedGuess > 100) {
		validate.valid = false;
		validate.errormsg = "Guess should be between 1 and 100.";
		return validate;
	}
	validate.parsedGuess = parsedGuess;
	return validate;
}


/* Returns Very cold, cold, hot and very hot */
var baseResponseFromGuess = function(target, guess) {
	var distance = Math.abs(target - guess);
	if (distance > 50) {
	 	return "Ice cold";
	} else if (distance > 30) {
		return "Cold";
	} else if (distance > 20) {
		return "Warm";
	} else if (distance > 10) {
		return "Hot";
	} else {
		return "Super hot";
	}
	return "Hrm...";
}

/* Returns "hotter than X" or "colder than x" */
var relativeResponseFromGuess = function (guess, lastGuess, target) {
	if (!lastGuess || lastGuess == 0) {
		return null;
	}
	var currentDistance = Math.abs(target - guess);
	var previousDistance = Math.abs(target - lastGuess);
	if (currentDistance > previousDistance) {
		return "cooler than "+ lastGuess;
	} else {
		return "warmer than " + lastGuess;
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


