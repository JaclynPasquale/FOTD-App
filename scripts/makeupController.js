;(function() {

  angular.module("fotdApp")

  .controller("MakeupController", function($scope, makeupFactory, upload, $rootScope, $location, authFactory, $http, FIREBASE_URL) {
    var vm = this;
    $scope.photo = {};

    //webcam stuff
    vm.takePhoto = function(){
      console.log('take photo');
      takepicture();
      $scope.photo = photo.currentSrc;
      console.log('BASE 64 DATA');
      console.log($scope.photo);

    };

    var streaming = false,
    video        = document.querySelector('#video'),
    canvas       = document.querySelector('#canvas'),
    photo        = document.querySelector('#photo'),
    width = 320,
    height = 0;


    navigator.getMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

      navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log('An error occured!' + err);
      }
    );


    video.addEventListener('canplay', function(ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);


    function takepicture(){
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    };



    //makeup business saves to s3 and gets id from firebase
    vm.addMakeupInfo = function() {
      console.log('worked');
      makeupFactory.addMakeupInfo(vm.newMakeup, function(data) {
        vm.Makeup = vm.Makeup || {};
        vm.Makeup[data.name] = vm.newMakeup;
        _uploadFile(data.name, function(link){
          var fotdImage = [link]
          console.log($rootScope.user);

          $http.put(FIREBASE_URL + "users/" + $rootScope.user.uid + "/makeup/" + data.name  + "/fotdImage" + '/.json?auth=' + $rootScope.user.token, fotdImage )
          .success(function(){
            console.log("success image to firebase")
            $location.path('/showFOTD');
          }).error(function(err){
            console.log("nope")
          })
        })

      });
    };


    //photo upload
    vm.fileSelected = function(){

      _setThumbnail(vm.files[0], function(base64){
        vm.files[0].dataUrl = base64;
        $scope.$apply();
      });
    };

    //converting base64 to blob
    function _b64toBlob(b64Data) {
      b64Data = b64Data.slice(b64Data.indexOf(',') + 1);


      contentType = 'image/png';
      sliceSize = 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, {type: contentType, name: 'abc.png'});
      return blob;
    }

    //upload image file or webcam photo
    function _uploadFile(makeupId, cb){
      console.log('sent to s3')
      if (vm.files){
        var file = vm.files[0];
        upload.uploadPhoto(file, $rootScope.user.uid, makeupId , function(s3link){
          console.log("sent to s3")
          var linkId = s3link + "/" + makeupId + ".jpg";
          cb(linkId);
          console.log(cb);
        });
      } else {

        var file = _b64toBlob($scope.photo);
        file.name = makeupId + ".jpg";

        upload.uploadWebcam(file, $rootScope.user.uid, makeupId, function(s3link){

          console.log('sent to s3')
          var linkId = s3link ;
          cb(linkId);
          console.log(cb);


        });
      }

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

  .factory('upload', function($upload, $rootScope){
    var factory = {}



    factory.uploadPhoto = function(file, userId, photoId, cb){

      $upload.upload({
        url: 'https://fotd-image-upload.s3.amazonaws.com',
        method: 'POST',
        data: {
          'Content-Type' : file.type,
          key: userId + '/' + photoId + '.jpg',
          acl: 'public-read',
          awsaccesskeyid: 'AKIAI6TMM3TOLI4KFABQ',
          policy: 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQwMDowMDowMFoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJmb3RkLWltYWdlLXVwbG9hZCJ9LHsiYWNsIjogInB1YmxpYy1yZWFkIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCIiXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdXX0=',
          signature: 'hha3lgECjhcFSZQbupeJVgc9j6A='
        },
        file: file
      })
      .success(function(data, status, headers, config){

        console.log("upload photo")
        cb('https://fotd-image-upload.s3.amazonaws.com/' + $rootScope.user.uid);

      });
    };

    factory.uploadWebcam = function(img, userId, photoId, cb){

      $upload.upload({
        url: 'https://fotd-image-upload.s3.amazonaws.com',
        method: 'POST',
        data: {
          'Content-Type' : "img/jpg",
          key: userId + '/' + photoId + '.jpg',
          acl: 'public-read',
          awsaccesskeyid: 'AKIAI6TMM3TOLI4KFABQ',
          policy: 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQwMDowMDowMFoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJmb3RkLWltYWdlLXVwbG9hZCJ9LHsiYWNsIjogInB1YmxpYy1yZWFkIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCIiXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdXX0=',
          signature: 'hha3lgECjhcFSZQbupeJVgc9j6A='
        },
        file: img
      })
      .success(function(data, status, headers, config){

        cb('https://fotd-image-upload.s3.amazonaws.com/' + $rootScope.user.uid + '/' + config.file.name);

      });
    };
    return factory;

  })






}());
//end of iffe
