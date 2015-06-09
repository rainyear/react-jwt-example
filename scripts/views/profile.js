var React = require('react');
var Reflux = require('reflux');
var BS    = require('react-bootstrap');
var Router= require('react-router');
var actions = require('../actions/actions');

var userStore = require('../stores/userStore');

var Profile = React.createClass({
  mixins:[
    Router.Navigation,
    Reflux.listenTo(userStore, "updateProfile"),
  ],
  updateProfile: function(user){
    alert(user.balance)
  },
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
        {this.state.user.mail} <BS.Button ref='getBalanceBtn' onClick={actions.getBalance} bsStyle='danger'>balance</BS.Button>
        </BS.Panel>
    );
  },
});

module.exports = Profile;
