;(function() {

  angular.module("fotdApp")

  .controller("LoginController", function(authFactory, $scope, $location) {
     var vm = this;

     function _isLoggedIn() {
       return Boolean(ref.getAuth());
     }

     vm.register = function() {
      authFactory.register(vm.email, vm.password, function() {
        vm.login();
      });
     };

    vm.login = function() {
      authFactory.login(vm.email, vm.password, function() {
        $location.path("/makeup");
        $scope.$apply();
      });
    };
  })

    .controller("LogoutController", function($scope, $location, authFactory) {
      authFactory.logout(function() {
        $location.path("/login");
        $scope.$apply();
      });
    })

    .controller("MakeupController", function($scope, makeupFactory, upload, $rootScope) {
      var vm = this;


      //makeup business
      vm.addMakeupInfo = function() {
        makeupFactory.addMakeupInfo(vm.newMakeup, function(data) {
          vm.Makeup = vm.Makeup || {};
          vm.Makeup[data.name] = vm.newMakeup;
          });
        };


        //photo upload
        vm.fileSelected = function(){
          _setThumbnail(vm.files[0], function(base64){
            vm.files[0].dataUrl = base64;
            $scope.$apply();
          });
        };

        vm.uploadFile = function(){
          console.log('sent to s3')
          var file = vm.files[0];
          upload.uploadPhoto(file, name, function(){
            console.log('hi');
          });
        };

        function _setThumbnail (image, cb){
          _imagesToBase64(image, function(data){
            cb(data)
          });
        }

        function _imagesToBase64 (file, cb){
          if (file){
            var fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = function(e){
              cb(e.target.result);
            }
          }
        }
    })

    .factory('upload', function($upload){
      var factory = {}

      //change out todoId

      factory.uploadPhoto = function(file, userId, cb){

        var fileName = userId + '/' + file.name + '.jpg';

        $upload.upload({
          url: 'https://fotd-image-upload.s3.amazonaws.com',
          method: 'POST',
          data: {
            'Content-Type' : file.type,
            key: userId + '/' + name + '.jpg',
            acl: 'public-read',
            awsaccesskeyid: 'AKIAI6TMM3TOLI4KFABQ',
            policy: 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQwMDowMDowMFoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJmb3RkLWltYWdlLXVwbG9hZCJ9LHsiYWNsIjogInB1YmxpYy1yZWFkIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCIiXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdXX0=',
            signature: 'hha3lgECjhcFSZQbupeJVgc9j6A='
          },
          file: file
        })
        .success(function(data, status, headers, config){
          cb('https://fotd-image-upload.s3.amazonaws.com/' + config.file.name);

        });
      };
      return factory;
    })

}());
//end of iffe
