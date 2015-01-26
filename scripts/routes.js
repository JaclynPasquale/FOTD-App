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
  .when("/showFOTDs", {
    templateUrl: "views/showAll.html",
    controller: "makeupListController",
    controllerAs: "makeupListCtrl",
    private: "true"
  })
  .when("/:id", {
    templateUrl: "views/showEdit.html",
    controller: "makeupListController",
    controllerAs: "makeupListCtrl",
    private: "true"
  })


  .otherwise({ redirectTo: "/" });

})



}());
