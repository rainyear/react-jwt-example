var React       = require('react');
var Reflux      = require('reflux');
var Router      = require('react-router');
var HelloWorld  = require('./components/HelloWorld.js');
var Home        = require('./views/home.js');
var Login       = require('./views/login.js');
var Profile     = require('./views/profile.js');

var Route           = Router.Route;
var RouteHandler    = Router.RouteHandler;
var DefaultRoute    = Router.DefaultRoute;
var Link            = Router.Link;

var userStore = require('./stores/userStore');
var actions   = require('./actions/actions');
var BS = require('react-bootstrap');

var App = React.createClass({
  mixins:[
    Router.Navigation,
    Reflux.listenTo(userStore, 'onLoginSucc'),
  ],
  onLoginSucc: function (user) {
    this.setState({
      user: user,
    })
  },
  getInitialState: function() {
    return {
      user: userStore.getDefaultUser(),
    };
  },
  getProfile: function () {
    this.transitionTo("profile");
  },
  render: function () {
    var navItems;
    if (this.state.user.logd) {
      navItems = (
        <BS.Nav right>
          <BS.NavItem href="#/profile">{this.state.user.name}</BS.NavItem>
          <BS.NavItem onClick={actions.logout}>Logout</BS.NavItem>
        </BS.Nav>
      );
    }else{
      navItems = (
        <BS.Nav right>
          <BS.NavItem href="#/login">Login</BS.NavItem>
        </BS.Nav>
      );
    }
    return (
      <div className="App">
        <BS.Navbar brand={<Link to="home">React-jwt</Link>} inverse>
          { navItems }
        </BS.Navbar>
        <BS.Row className='show-grid'>
          <BS.Col xs={6} md={4}></BS.Col>
          <BS.Col xs={6} md={4}>
            <RouteHandler />
          </BS.Col>
          <BS.Col xs={6} md={4}></BS.Col>
        </BS.Row>
      </div>
      );
  }
});

var routes = (
    <Route handler={ App }>
      <DefaultRoute name="home" handler={ Home } />
      <Route name="login" path="/login" handler={ Login } />
      <Route name="profile" path="/profile" handler={ Profile } />
    </Route>
);
Router.run(routes, function(Handler) {
  React.render(<Handler />,
  document.getElementById('app'));
});
