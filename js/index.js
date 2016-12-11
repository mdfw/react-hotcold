require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var store = require('./store');
var App = require('./components/app');

document.addEventListener('DOMContentLoaded', function() {
	console.log("Store in App");
	console.dir(store);
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
});
