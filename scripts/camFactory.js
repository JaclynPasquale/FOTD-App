;(function() {
  "use strict";

angular.module("fotdApp")

.factory("camFactory", function(FIREBASE_URL, $http) {

  function _photoUrl(id) {
    if (id) {
      return FIREBASE_URL + "/users/" + $rootScope.user.uid +
      "/photos/" + id + ".json?auth=" + $rootScope.user.token;
    } else {
      return FIREBASE_URL + "/users/" + $rootScope.user.uid +
      "/tasks.json?auth=" + $rootScope.user.token;
    }

  }

  function savePhoto(imgBase64, cb) {
    $scope.photoData = imgBase64;
    $http.post(imgBase64, photo)
    .success(function(data) {
      cb(data);
    })
    .error(function(err) {
      console.log(err);
    });
  }

})


}());
