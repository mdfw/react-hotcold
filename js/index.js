require('babel-polyfill')

var React = require('react')
var ReactDOM = require('react-dom')
var Provider = require('react-redux').Provider

var store = require('./store')
var App = require('./components/app')
var subscriber = require('./actions/subscribe')

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    )
})
