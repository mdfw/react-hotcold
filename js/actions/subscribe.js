const actions = require('../actions/index');
const constants = require('../constants.js');
const store = require('../store');

let previousFeedback = '';

function handleChange() {
  const thisstate = store.getState();
  const feedback = thisstate.basefeedback;
  if (previousFeedback !== feedback && feedback === constants.BASE_CORRECT) {
    const numguesses = thisstate.guesses.length;
    store.dispatch(actions.postFewest(numguesses));
  }
  previousFeedback = feedback;
}

store.subscribe(handleChange);
