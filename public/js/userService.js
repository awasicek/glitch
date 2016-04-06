(function(){
  angular.module('glitch')
    .service('user', userService)

  userService.$inject = ['$http']

  function userService($http){
    var self = this;

    self.login = function(email, password){
      return $http.post('api/authenticate', {
        email: email,
        password: password
      });
    };

    self.register = function(email, password){
      return $http.post('api/register', {
        email: email,
        password: password
      });
    };
    self.getUsers = function(name, password){
      return $http.get('api/users');
    };
  }
})()
