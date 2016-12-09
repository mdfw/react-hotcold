var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/index');

var Game = require('./game');
var Info = require('./infoscreen');

var App = React.createClass({
	getInitialState: function() {
        return {
            showingInfo: false
        }
    },
    showInfo: function() {
        this.setState({
			showingInfo: true
		})
    },
    exitInfo: function() {
	    this.setState({
			showingInfo: false
		})
    },
    newGame: function() {
		this.props.dispatch(
            actions.resetGame() 
		);
  
    },
    render: function() {
	    if (this.state.showingInfo) {
		    return (
		    	<Info onClick={this.exitInfo} />
		    )
	    } else {
		    return (
			    <div id="gameapp">
					<header> 
					<nav> 
						<ul className="clearfix">
							<li onClick={this.showInfo} ><a className="what" href="#">What ?</a></li>
							<li onClick={this.newGame} ><a className="new" href="#">+ New Game</a></li>
						</ul>
					</nav>
					<h1>HOT or COLD</h1>
		
					</header>
					
					<Game />
				</div>
		    )
		    
		    
	    }
    }
});

var Container = connect()(App);

module.exports = Container;
