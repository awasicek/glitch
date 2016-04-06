(function(){
  angular.module('glitch')
    .controller('MainController', MainController)

  function MainController(user, auth){
    var self = this;

    function handleRequest(res){
      var token = res.data ? res.data.token : null;
      console.log(res);
      if (token){
        // console.log('JWT:', token);
        // auth.saveToken(token);
      };
      self.message = res.data.message;
    }

    self.login = function() {
      user.login(self.name, self.password)
        .then(handleRequest, handleRequest);
    }

    self.register = function() {
      user.register(self.name, self.password)
        .then(handleRequest, handleRequest);
    }
    self.getUsers = function() {
      user.getUsers()
        .then(handleRequest, handleRequest);
    }
    self.logout = function() {
      auth.logout && auth.logout();
      self.message = 'Logout complete.';
    }
    self.isAuthed = function() {
      return auth.isAuthed ? auth.isAuthed() : false;
    }
  }
})()
