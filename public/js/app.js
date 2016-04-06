(function(){
  angular.module('glitch', ['ui.router'])
    .config(function($httpProvider){
      $httpProvider.interceptors.push('authInterceptor');
    })


})()
