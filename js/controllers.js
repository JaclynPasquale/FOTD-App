;(function() {

  angular.module("fotdApp")

  .controller("LoginController", function(authFactory, $scope, $location) {
     var vm = this;

     function _isLoggedIn() {
       return Boolean(ref.getAuth());
     }

     vm.register = function() {
      authFactory.register(vm.email, vm.password, function() {
        vm.login();
      });
     };

     vm.login = function() {
       authFactory.login(vm.email, vm.password, function() {
         $location.path("/");
         $scope.$apply();
       });
     };
   })

    .controller("LogoutController", function($scope, $location, authFactory) {
      authFactory.logout(function() {
        $location.path("/login");
        $scope.$apply();
      });
    });

    // .controller("WebcamController", function(){
    //
    //
    // });

 }());
 //end of iffe
