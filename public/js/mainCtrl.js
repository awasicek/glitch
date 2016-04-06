(function(){
  angular.module('glitch')
    .controller('MainController', MainController)

  function MainController(userService, authService, $state){
    var self = this;

    self.users = []

    self.currentUser

    function handleRequest(res){
      var token = res.data ? res.data.token : null;
      console.log(res);
      if (token){
        // console.log('JWT:', token);
        // authService.saveToken(token);
      };
      self.message = res.data.message;
    }

    function handleSignupRequest(res){
      var token = res.data ? res.data.token : null;
      console.log(res);
      if (token){
        // console.log('JWT:', token);
        // authService.saveToken(token);
      };
      self.message = res.data.message;
      self.currentUser = res.data.user
      $state.go('profile')
    }

    function handleUserRequest(res){
      var token = res.data ? res.data.token : null;
      // console.log(res);
      if (token){
        // console.log('JWT:', token);
        // authService.saveToken(token);
      };
      self.users = res.data.message;
      console.log(self.users)
    }

    function handleLoginRequest(res){
      var token = res.data ? res.data.token : null;
      console.log(res);
      if (token){
        // console.log('JWT:', token);
        // authService.saveToken(token);
      };
      self.message = res.data.message;
      self.currentUser = res.data.user
      $state.go('home')
    }

    self.login = function() {
      userService.login(self.email, self.password)
        .then(handleLoginRequest, handleLoginRequest);
    }

    self.register = function() {
      userService.register(self.email, self.firstname, self.lastname, self.password)
        .then(handleSignupRequest, handleSignupRequest);
    }
    self.getUsers = function() {
      userService.getUsers()
        .then(handleUserRequest, handleUserRequest);
    }

    self.logout = function() {
      authService.logout && authService.logout();
      self.message = 'Logout complete.';
      $state.go('home')
    }

    self.isAuthed = function() {
      return authService.isAuthed ? authService.isAuthed() : false;
    }

    self.profile = function() {
      
    }

  }

})()
