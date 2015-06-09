var React = require('react');
var BS    = require('react-bootstrap');
var Router= require('react-router');

var userStore = require('../stores/userStore');

var Profile = React.createClass({
  mixins:[
    Router.Navigation,
  ],
  getInitialState: function() {
    return {
      user: userStore.getDefaultUser(),
    };
  },
  componentDidMount: function() {
    if (!this.state.user.logd) {
      this.transitionTo("login");
    }
  },
  render: function(){
    var title = (<span>Hello, {this.state.user.name}</span>);
    return (
        <BS.Panel header={title}>
        {this.state.user.mail}
        </BS.Panel>
    );
  },
});

module.exports = Profile;
