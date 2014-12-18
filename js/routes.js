;(function() {
  "use strict";

angular.module("fotdApp")
.config(function($routeProvider) {
  $routeProvider

  .when("/", {
    templateUrl: "views/login.html",
    controller: "LoginController",
    controllerAs: "loginCtrl"
  })
  .when("/takefotd", {
    templateUrl: "views/takefotd.html",
    controller: "CameraController",
    controllerAs: "camCtrl"
  })

  .when("/logout", {
    template: "",
    controller: "LogoutController"

  })
  .when("/newpic", {
    templateUrl: "views/takefotd.html",
    controller: "CameraController",
    controllerAs: "camCtrl",
    private: "true"
  })
  .when("/allpics", {
    templateUrl: "views/allfotd.html",
    controller: "",
    controllerAs: "",
    private: "true"
  })
  .when("/allpics/:id", {
    templateUrl: "views/showfotd.html",
    controller: "",
    controllerAs: "",
    private: "true"
  })

  .otherwise({ redirectTo: "/" });

})



}());
