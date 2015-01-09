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
        $location.path("/makeup");
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
          alertify.success("Password changed successfully");
          cb();
        } else {
          alertify.error("Error changing password:", error);
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
          alertify.success("User logged in successfully");
          console.log("logged in", authData)
          $rootScope.user = authData;
          ref.child("users").child(authData.uid).child("authData").set(authData);
          cb();
        } else {
          alertify.error("User Login Failed");
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
        alertify.success("User created successfully");
        console.log('User created successfully', authData);
        cb();
      } else {
        alertify.error("Error creating user:");
        console.log('Error creating user:', error);
      }
    }
  );
}

factory.logout = function(cb) {
  ref.unauth(function() {
    $rootScope.user = null;
    cb();
    console.log("User is logged out");
    alertify.success("User is logged out");
  });
};

factory.resetPassword = function(email){
  ref.resetPassword({
    email : email
  }, function(error) {
    if (error === null) {
      console.log('Password reset email sent successfully');
      alertify.success("Password reset email sent successfully");
    } else {
      console.log('Error sending password reset email:', error);
      alertify.error("Error sending password reset email");
    }
  }
);
};


return factory;

})

})();
