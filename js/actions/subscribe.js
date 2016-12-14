var actions = require('../actions/index');
var constants = require('../constants.js');
var store = require('../store');

var previousFeedback = ""

function handleChange() {
  var thisstate = store.getState()
  var feedback = thisstate.basefeedback
  if (previousFeedback !== feedback && feedback === constants.BASE_CORRECT) {
    var numguesses = thisstate.guesses.length
    console.log("sending new number of guesses: " + numguesses)
    previousFeedback = feedback
    store.dispatch(actions.postFewest(numguesses))
  }

}

store.subscribe(handleChange)
