var Reflux = require('reflux');
var actions = require('../actions/actions');
var jwt_decode = require('jwt-decode');

defaultUser = {
  name: "",
  mail: "",
  logd: false,
}
var userStore = Reflux.createStore({
  listenables: actions,
  init: function () {
    jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.user = defaultUser;
    }else{
      this.user = jwt_decode(jwt);
      this.user.logd = true;
    }
  },

  getDefaultUser: function () {
    return this.user;
  },
  updateProfile: function(jwt){
    localStorage.setItem('jwt', jwt);
    this.user = jwt_decode(jwt);
    this.user.logd = true;
    this.trigger(this.user);
  },
  logout: function(){
    localStorage.removeItem('jwt');
    this.user = defaultUser;
    this.trigger(this.user);
  }

});


module.exports = userStore;
