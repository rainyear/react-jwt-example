var React       = require('react');
var Router      = require('react-router');
var HelloWorld  = require('./components/HelloWorld.js');
var Home        = require('./views/home.js');

var Route           = Router.Route;
var RouteHandler    = Router.RouteHandler;
var DefaultRoute    = Router.DefaultRoute;
var Link            = Router.Link;


var App = React.createClass({
  render: function () {
    return (
      <div className="App">
        <HelloWorld />
        <RouteHandler />
      </div>
      );
  }
});

var routes = (
    <Route handler={ App }>
      <DefaultRoute name="Home" path="/" handler={ Home } />
    </Route>
);
Router.run(routes, function(Handler) {
  React.render(<Handler />,
  document.getElementById('app'));
});
