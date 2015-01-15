;(function() {
  "use strict";

angular.module("fotdApp")
.config(function($routeProvider){
  $routeProvider



  .when("/makeup", {
    templateUrl: "views/takefotd.html",
    controller: "MakeupController",
    controllerAs: "makeupCtrl",
    private: "true"
  })
  .when("/showFOTD", {
    templateUrl: "views/showAll.html",
    controller: "showFotdController",
    controllerAs: "showCtrl",
    private: "true"
  })
  .when("/allphotos/:id", {
    templateUrl: "views/showEdit.html",
    controller: "",
    controllerAs: "",
    private: "true"
  })


  .otherwise({ redirectTo: "/" });

})



}());
