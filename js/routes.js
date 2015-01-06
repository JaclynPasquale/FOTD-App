;(function() {
  "use strict";

angular.module("fotdApp")
.config(function($routeProvider){
  $routeProvider

  .when("/", {
    templateUrl: "views/login.html",
    controller: "LoginController",
    controllerAs: "loginCtrl"
  })
  .when("/makeup", {
    templateUrl: "views/takefotd.html",
    controller: "MakeupController",
    controllerAs: "makeupCtrl"
  })

  .when("/logout", {
    template: "/",
    controller: "LogoutController"

  })
  // .when("/newphoto", {
  //   templateUrl: "views/takefotd.html",
  //   controller: "MakeupController",
  //   controllerAs: "makeupCtrl",
  //   private: "true"
  // })
  .when("/allphotos", {
    templateUrl: "views/allfotd.html",
    controller: "",
    controllerAs: "",
    private: "true"
  })
  .when("/allphotos/:id", {
    templateUrl: "views/showfotd.html",
    controller: "",
    controllerAs: "",
    private: "true"
  })

  .otherwise({ redirectTo: "/" });

})



}());
