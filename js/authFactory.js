;(function() {

  angular.module("fotdApp")

    .factory("authFactory", function($rootScope, $location, FIREBASE_URL) {
      var factory = {},
              ref = new Firebase(FIREBASE_URL)

      //$rootScope.user = ref.getAuth();

      factory.login = function(email, password, cb) {
          ref.authWithPassword({
            email: email,
            password: password
          }, function(error, authData) {
            if (error === null) {
              console.log("User logged in successfully", authData);
              $rootScope.user = authData;
              ref.child("users").child(authData.uid).child("authData").set(authData);
              cb();
            } else {
              console.log("User Login Failed", error);
            }
          }
        );
      };

    factory.register = function(email, password, cb) {
        ref.createUser({
          email: email,
          password: password
        }, function(error, authData) {
          if (error === null) {
            console.log("User created successfully", authData);
            cb();
          } else {
            console.log("Error creating user:", error);
          }
        }
      );
    }

    factory.logout = function(cb) {
      ref.unauth(function() {
        $rootScope.user = null;
        cb();
      });
    };





    return factory;

    })

})();
