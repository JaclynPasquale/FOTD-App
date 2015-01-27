;(function(){
  'use strict';

  angular.module('fotdApp')
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'views/login.html'
    })
    .otherwise({redirectTo: '/'});
  })
}());
