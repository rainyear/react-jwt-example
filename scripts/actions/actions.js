var Reflux = require('reflux');
var req    = require('reqwest');

HOST = "http://127.0.0.1:3001"

var actions = Reflux.createActions({
  "login": {},
  "updateProfile": {},
  "loginError": {},
  "logout": {},
  "getBalance": {asyncResult: true}
});


actions.login.listen(function(data){
  req({
    url: HOST+"/user/token",
    method: "post",
    // data: {"name": data.name, "mail": data.mail},
    data:JSON.stringify(data),
    type: 'json',
    contentType: 'application/json',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    success: function (resp) {
      if(resp.code == 200){
        actions.updateProfile(resp.jwt)
      }else{
        actions.loginError(resp.msg)
      }
    },
  })

});
actions.getBalance.listen(function(){
  var jwt = localStorage.getItem('jwt');
  req({
    url: HOST+"/user/balance",
    method: "post",
    type: "json",
    headers: {
      'Authorization': "Bearer "+jwt,
    },
    success: function (resp) {
      if (resp.code == 200) {
        actions.updateProfile(resp.jwt);
      }else{
        actions.loginError(resp.msg);
      }
    }
  })
})
module.exports = actions;
