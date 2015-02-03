;(function(){

  angular.module("fotdApp")
  .controller("makeupListController", function($scope, makeupFactory, upload, $rootScope, $routeParams, $location, authFactory, $http, FIREBASE_URL, $filter)
  {
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


    vm.removeMakeup = function(){

    var location = $location.$$path.slice( 1, $location.$$path.length);
      makeupFactory.deleteMakeup(location, function(){
        console.log(location);
        debugger;
        delete vm.selectedMakeup[location];
        console.log("fotd has been deleted")
        $location.path('/showFOTDs');
      });
    }

  });

  angular.module("fotdApp")
  .filter('moment', [
  function () {
    return function (date, method) {
      var momented = moment(date);
      return momented[method].apply(momented, Array.prototype.slice.call(arguments, 2));
    };
  }
  ]);
})();
