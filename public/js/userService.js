(function(){
  angular.module('glitch')
    .service('userService', userService)

  userService.$inject = ['$http']

  function userService($http){
    var self = this;

    self.login = function(email, password){
      return $http.post('api/authenticate', {
        email: email,
        password: password
      });
    };

    self.register = function(email, firstname, lastname, password){
      return $http.post('api/register', {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password
      });
    };

    self.getUsers = function(email, password){
      return $http.get('api/users');
    };
  }
})()
