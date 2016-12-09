var redux = require('redux');
var createStore = redux.createStore;

var reducers = require('./reducers/index');

var store = createStore(reducers.hotcoldReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports  = store;