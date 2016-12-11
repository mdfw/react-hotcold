// Validation errors. Thrown by the reducer if guess does not pass basic validation filters.
exports.VALIDATION_ERROR_NOGUESS = 'VE_NOGUESS' 		// Please enter a guess.
exports.VALIDATION_ERROR_NAN = 'VE_NAN' 				// Guess should be a number.
exports.VALIDATION_ERROR_OUTOFBOUNDS = 'VE_OUTOFBOUNDS' // Guess should be between MIN and MAX.

// Base response feedback
exports.BASE_BEGIN = 'BASE_BEGIN' 		// Make your guess!
exports.BASE_CORRECT = 'BASE_CORRECT'  	// Correct!
exports.BASE_ICECOLD = 'BASE_ICECOLD'  	// Ice cold
exports.BASE_COLD = 'BASE_COLD'			// Cold
exports.BASE_WARM = 'BASE_WARM'			// Warm
exports.BASE_HOT = 'BASE_HOT'			// Hot
exports.BASE_SUPERHOT = 'BASE_SUPERHOT'	// Super hot
exports.BASE_HRM = 'BASE_HRM'  			// "Hrm..." Only returned on parsing issues.


// Relative response feedback
exports.RELATIVE_WARMER = 'RELATIVE_WARMER'	// ", warmer than " + previousguess
exports.RELATIVE_COOLER = 'RELATIVE_COOLER' // ", cooler than " + previousguess
