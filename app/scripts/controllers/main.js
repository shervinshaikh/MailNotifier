'use strict';

angular.module('conferenceApp')
  .controller('MainCtrl', function ($scope, $http, $interval, $window) {
    $scope.isThereMail = false;
    // $scope.room2 = "available";

    var THRESHOLD = 100000;

    // Motion sensor 1
    $http({
      method: 'GET',
      url: 'http://skynet.im/data/adcf9640-f71a-11e3-a289-c9c410d2a47e',
      headers: {
        'skynet_auth_uuid': 'adcf9640-f71a-11e3-a289-c9c410d2a47e',
        'skynet_auth_token': '0c4liaas7dum78pviw7ovh5pvc4k7qfr'
      }
    })
    .success(function(data, status, headers, config) {
      $scope.isThereMail = data.data[0].isThereMail;
      console.log(data.data[0].isThereMail);
    })
    .error(function(data, status, headers, config) { console.error("Unable to connect to Meshblu (formerly Skynet)"); });


    // Receive update messages here
    var conn = skynet.createConnection({
      "uuid": "adcf9640-f71a-11e3-a289-c9c410d2a47e",
      "token": "0c4liaas7dum78pviw7ovh5pvc4k7qfr",
      "protocol": "websocket"
    });

    conn.on('ready', function(data){
      // console.log('Ready');
      conn.status(function (data) {
        // console.log(data);
      });

      conn.on('message', function(message) {
        // console.log(message);
        console.log(message.payload.dat);

        if(message.payload.typ === "mail"){
          $scope.isThereMail = message.payload.dat.isThereMail;
          $scope.$apply();
        }
      });

    });

    $scope.sendYo = function(){
      var username = prompt("Please enter your YO username");
      if(username !== undefined){
        $scope.username = username;
        $scope.yo = true;
        console.log($scope.username);

        $window.alert("Will send a YO to " + username + " when the table is free.  Please keep this browser tab open to be able to receive the YO.");
      }
    };

    $scope.updateRoom = function(mail){
      $scope.isThereMail = mail;

      if($scope.isThereMail === true && $scope.yo){
        $scope.yo = false;

        var data = {
          'api_token': '07a20287-6848-7bfc-fb8f-1cc06ae4c468',
          'username': $scope.username
        }
        $http.post('http://api.justyo.co/yo/', data)
        .success(function(data, status, headers, config) {
          console.log("Succesfully sent Yo!");
        })
        .error(function(data, status, headers, config) { console.error("Unable to send Yo"); });
      }
    };

  });
