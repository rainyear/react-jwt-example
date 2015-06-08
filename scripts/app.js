var React       = require('react');
var Router      = require('react-router');
var HelloWorld  = require('./components/HelloWorld.js');
var Home        = require('./views/home.js');
var About       = require('./views/about.js');

var Route           = Router.Route;
var RouteHandler    = Router.RouteHandler;
var DefaultRoute    = Router.DefaultRoute;
var Link            = Router.Link;


var App = React.createClass({
  render: function () {
    return (
      <div className="App">
        <nav>
          <ul>
            <li><Link to="home">Home</Link></li>
            <li><Link to="about">About</Link></li>
          </ul>
        </nav>
        <HelloWorld />
        <RouteHandler />
      </div>
      );
  }
});

var routes = (
    <Route handler={ App }>
      <DefaultRoute name="home" handler={ Home } />
      <Route name="about" path="/about" handler={ About } />
    </Route>
);
Router.run(routes, function(Handler) {
  React.render(<Handler />,
  document.getElementById('app'));
});
