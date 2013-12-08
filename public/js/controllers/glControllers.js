//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glControllers.js
//
// Note: Controllers
//--------------------------------

"use strict";

// Add more controllers via .controller("YourCtrl"...)
angular.module("gameLibrary.controllers", []).
	controller("GameLibraryCtrl", ["$scope", "$http", function($scope, $http) {
 		var app 			= this;
 		
 		var checkKeyURL 	= "http://js.nrd.mn/challenge/checkKey?callback=JSON_CALLBACK&apiKey=";
 		var myApiKey		= "ab0f25a613e2845ede3f258060050006";
 		
 		var getGamesURL 	= "http://js.nrd.mn/challenge/getGames?callback=JSON_CALLBACK&apiKey=";

 		var validate		= checkKeyURL+myApiKey;
 		var getGames		= getGamesURL+myApiKey;
 		
 		$http({
 			method: "JSONP",
 			url: getGames
 		}).success(function (data) {
			console.log("Game object retrieved.");
			console.log( data )
 		}).error(function () {
			console.log("Failed to download game object.");
 		});
 		

 		
 	}]);
