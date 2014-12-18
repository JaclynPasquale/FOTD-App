;(function() {

  angular.module("fotdApp")

  .factory("authFactory", function($rootScope, $location, FIREBASE_URL) {
    var factory = {},
    ref = new Firebase(FIREBASE_URL)

    $rootScope.user = ref.getAuth();

    factory.requireLogin = function() {
      if (!_isLoggedIn()) {
        $location.path("/login");
      } else if (_hasTemporaryPassword()) {
        $location.path("/changepassword");
      }
    };

    factory.disallowLogin = function() {
      if (_isLoggedIn()) {
        $location.path("/todos");
      }
    };

    function _isLoggedIn() {
      return Boolean(ref.getAuth());
    }

    function _hasTemporaryPassword() {
      return ref.getAuth().password.isTemporaryPassword;
    }

    factory.changePassword = function(oldPassword, newPassword, cb) {
      ref.changePassword({
        email       : ref.getAuth().password.email,
        oldPassword : oldPassword,
        newPassword : newPassword,
      }, function(error) {
        if (error === null) {
          console.log("Password changed successfully");
          cb();
        } else {
          console.log("Error changing password:", error);
        }
      }
    );
  };


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
    console.log("User is logged out");
  });
};





return factory;

})

})();
