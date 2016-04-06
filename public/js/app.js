(function(){
  angular.module('glitch', ['ui.router'])
    .config(function($httpProvider){
      $httpProvider.interceptors.push('authInterceptor');
    })
    .config(function($stateProvider, $urlRouterProvider){

      //handle any attempts to routes other than what is listed below
      // $urlRouterProvider.otherwise('/')

      //my established routes
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/partials/home.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: '/partials/login.html'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: '/partials/signup.html'
        })
        .state('users', {
          url: '/users',
          templateUrl: '/partials/users.html'
        })
        .state('profile', {
          url: '/profile',
          templateUrl: '/partials/profile.html'
        })
        .state('begin', {
          url: '/begin',
          templateUrl: '/partials/begin.html'
        })
      })


})()
