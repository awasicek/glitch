(function(){
  angular.module('glitch')
    .factory('authInterceptor', authInterceptor)

  function authInterceptor(auth){
    return {
      request: function(config) {
        var token = auth.getToken();
        if(token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      },

      response: function(res){
        if(res.data.token){auth.saveToken(res.data.token)};
        return res;
      }
    }
  }

})()
