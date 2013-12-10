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
 	 		
 	}]).controller("TitlesWeWantCtrl", ["$scope", "$http", function($scope, $http) {
 	
 		// handling the add new title open, submit, and close controls
 		$scope.toggleNewTitlePanelOn = function() {
 			console.log("Add title panel opened.");
 			return $scope.toggleNewTitlePanel = true;
 		}
 		
 		$scope.toggleNewTitlePanelOff = function() {
 			console.log("Closed the add title panel.");
 			return $scope.toggleNewTitlePanel = false;
 		}
 		
 		$scope.addNewTitleTrigger = function() {
 			console.log("New title has been submitted");
 		}
 	
 	}]).controller("TitlesWeOwnCtrl", ["$scope", "$http", function($scope, $http) {
 	
 		// handling the sell all titles we own control
 		$scope.sellAllTitles = function() {
			( confirm("Are You Sure?") ) ? console.log("Sold!") : console.log("Canceled - for now!");
 		}
 	
 	}]);
