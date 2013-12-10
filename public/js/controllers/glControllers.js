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
	controller("GameLibraryCtrl", ["$scope", "$http", "checkAPI", function($scope, $http, checkAPI) {

		// Uncomment and run to do a quick API Key validation check
		// validateKey();
		
		
		function validateKey() {
			checkAPI.then(function(response) {
				( response.data ) ? console.log("API Valid") : console.log("Server connection or API key failure. Please check API key and try again.")
			});
		};
 	 		
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
