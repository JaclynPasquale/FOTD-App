;(function(){

  angular.module("fotdApp")
  .controller("makeupListController", function($scope, makeupFactory, upload, $rootScope, $location, authFactory, $http, FIREBASE_URL) {
    var vm = this;

  function getMakeup(){
    $http.get(FIREBASE_URL + "users/" + $rootScope.user.uid + "/makeup/.json?auth=" + $rootScope.user.token )
    .success(function(data){
      vm.makeup = data;
      console.log(vm.makeup)
    })
    .error(function(err){
      console.log(err);
    });
  }

  getMakeup();

});
})();
