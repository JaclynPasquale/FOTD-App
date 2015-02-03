;(function() {
  "use strict";

  angular.module("fotdApp")
  .factory("makeupFactory", function(FIREBASE_URL, $rootScope, $http, $location)
  {

    function _fotdUrl(id) {
      if (id) {
        return FIREBASE_URL + "/users/" + $rootScope.user.uid +
        "/makeup/" + id + ".json?auth=" + $rootScope.user.token;
      } else {
        return FIREBASE_URL + "/users/" + $rootScope.user.uid +
        "/makeup.json?auth=" + $rootScope.user.token;
      }

    }

    function addMakeupInfo(makeup, cb) {
      makeup.date = new Date;
      $http.post(_fotdUrl(), makeup)
      .success(function(data) {
        cb(data);
      })
      .error(function(err) {
        console.log(err);
      });
    }

    function deleteMakeup(makeupId, cb){
      $http.delete(_fotdUrl(makeupId))
      .success(function(){
        cb();
      })
      .error(function(err){
        console.log(err);
      });
    }
    return {
      addMakeupInfo: addMakeupInfo,
      deleteMakeup: deleteMakeup
    };



})
})();
