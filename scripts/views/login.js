var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var BS = require('react-bootstrap');
var actions = require('../actions/actions');
var userStore = require('../stores/userStore');
var loginStore = require('../stores/loginStore');

var Login = React.createClass({
  mixins : [
    Router.Navigation,
    Reflux.listenTo(userStore, 'onLoginSucc'),
    Reflux.listenTo(loginStore, 'onLoginErr')
  ],
  getInitialState: function() {
    return {
      errorMsg: "",
    };
  },
  onLoginSucc: function(){
    this.transitionTo('home');
  },
  onLoginErr: function (msg) {
    this.setState({
      errorMsg: msg, 
    });
  },
  login: function (e) {
    e.preventDefault();
    actions.login({
      name: this.refs.name.getValue(),
      pass: this.refs.pass.getValue(),
    });
  },
  render: function () {
    var errorMsg;
    if (this.state.errorMsg != "" ) {
      errorMsg = (
        <BS.Alert bsStyle='warning'>
          <strong>{ this.state.errorMsg }</strong>
        </BS.Alert>
      );
    }
    return (
      <form className='form-horizontal' onSubmit={this.login}>
        <BS.Input ref="name" type='text' label='Name' labelClassName='col-xs-2' wrapperClassName='col-xs-6' />
        <BS.Input ref="pass" type='password' label='Pass' labelClassName='col-xs-2' wrapperClassName='col-xs-6' />
        <BS.Button bsStyle='primary' wrapperClassName='col-xs-6' type="submit">Login</BS.Button>
        { errorMsg }
      </form>
      );
  }
});

module.exports = Login;
