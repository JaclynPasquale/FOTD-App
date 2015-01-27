;(function(){

  angular.module("fotdApp")
  .controller("makeupListController", function($scope, makeupFactory, upload, $rootScope, $routeParams, $location, authFactory, $http, FIREBASE_URL) {
    var vm = this;

  function getMakeup(){
    $http.get(FIREBASE_URL + "users/" + $rootScope.user.uid + "/makeup/.json?auth=" + $rootScope.user.token )
    .success(function(data){
      vm.makeup = data;
      console.log($routeParams.id);
      vm.selectedMakeup = vm.makeup[$routeParams.id];
      console.log(vm.makeup);
      console.log(vm.selectedMakeup);
    })
    .error(function(err){
      console.log(err);
    });
  }


   getMakeup();


  // var imgDate = FIREBASE_URL + "users/" + $rootScope.user.uid + "/makeup/date/.json?auth=" + $rootScope.user.token
  // var now = new Date();
  // var newNow = Date.now
  // var newNow = Date.now();
  // var now = moment();
  //
  // moment({{imgDate}}).fromNow();


});
})();
