"use strict";angular.module("conferenceApp",["ngCookies","ngSanitize"]),angular.module("conferenceApp").controller("MainCtrl",["$scope","$http","$interval",function(a,b,c){a.room1="available";var d=1e5;b({method:"GET",url:"http://skynet.im/data/fd4a7a21-112b-11e4-a6fc-2d0cfe3a0468",headers:{skynet_auth_uuid:"adcf9640-f71a-11e3-a289-c9c410d2a47e",skynet_auth_token:"0c4liaas7dum78pviw7ovh5pvc4k7qfr"}}).success(function(b){a.motion1Data=b.data,a.motion1="active"===b.data[0].motion?!0:!1}).error(function(){console.error("Unable to connect to Meshblu (formerly Skynet)")}),b({method:"GET",url:"http://skynet.im/data/b6391e20-112b-11e4-a6fc-2d0cfe3a0468",headers:{skynet_auth_uuid:"adcf9640-f71a-11e3-a289-c9c410d2a47e",skynet_auth_token:"0c4liaas7dum78pviw7ovh5pvc4k7qfr"}}).success(function(b){a.motion2Data=b.data;var c=a.timeDiff(b.data);a.motion2d=d>c?!0:!1,a.motion2="active"===b.data[0].motion?!0:!1,a.room1=a.motion1&&a.motion2d?"unavailable":"available"}).error(function(){console.error("Unable to connect to Meshblu (formerly Skynet)")}),a.timeDiff=function(a){var b=Date.parse(a[0].timestamp)-Date.parse(a[a.length-1].timestamp);return console.log("Difference:",b),b};var e=skynet.createConnection({uuid:"adcf9640-f71a-11e3-a289-c9c410d2a47e",token:"0c4liaas7dum78pviw7ovh5pvc4k7qfr",protocol:"websocket"});e.on("ready",function(){e.status(function(){}),e.on("message",function(b){if(console.log(b.payload.dat),"room"===b.payload.typ)if("1"===b.payload.dat.num){{b.payload.dat}a.motion1="active"===b.payload.dat.motion?!0:!1,a.room1=a.motion1&&a.motion2d?"unavailable":"available",a.$apply()}else if("2"===b.payload.dat.num){a.motion2Data.unshift({motion:b.payload.dat.motion,timestamp:b.timestamp}),a.motion2Data.pop();var c=a.timeDiff(a.motion2Data);console.log("Diference:",c),a.motion2="active"===b.payload.dat.motion2?!0:!1,a.motion2d=d>c?!0:!1,a.room1=a.motion1&&a.motion2d?"unavailable":"available",a.$apply()}})}),c(function(){if(a.motion2d===!0){var b=Date.now()-Date.parse(a.motion2Data[0].timestamp);console.log("INTER Diff:",b),a.motion2d=2e4>b?!0:!1,a.room1=a.motion1&&a.motion2d?"unavailable":"available"}},5e3)}]);