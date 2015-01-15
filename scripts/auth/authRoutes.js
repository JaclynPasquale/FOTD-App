;(function(){
  angular.module('fotdApp')
  .config(function($routeProvider){
    $routeProvider


    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl',
      resolve: {
        data: function(authFactory){
          authFactory.disallowLogin();
        }
      }
    })
    .when('/logout', {
      template: '',
      controller: 'LogoutController'
    })
    .when('/changepassword', {
      templateUrl: 'views/changepassword.html',
      controller: 'ChangePasswordController',
      controllerAs: 'changepw',
      private: true
    })
  })
  .run(function($rootScope, authFactory){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, priorRoute){
      if (nextRoute.$$route && nextRoute.$$route.private) {
        authFactory.requireLogin();
      }
    })
  })
}());
