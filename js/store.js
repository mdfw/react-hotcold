var redux = require('redux');
var createStore = redux.createStore;
var compose = redux.compose;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;

var reducers = require('./reducers/index');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(reducers.hotcoldReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));

module.exports  = store;