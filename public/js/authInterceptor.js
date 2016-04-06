(function(){
  angular.module('glitch')
    .factory('authInterceptor', authInterceptor)

  function authInterceptor(authService){
    return {
      request: function(config) {
        var token = authService.getToken();
        if(token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      },

      response: function(res){
        if(res.data.token){authService.saveToken(res.data.token)};
        return res;
      }
    }
  }

})()
