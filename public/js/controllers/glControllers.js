//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glControllers.js
//
// Note: Controllers
//--------------------------------

"use strict";

// One global, two nested controllers
angular.module("gameLibrary.controllers", []).
	controller("GameLibraryCtrl", ["$scope","glWebAPI", function($scope, glWebAPI) {

		// Uncomment and run to do a quick API Key validation check
		//validateKey();
		
		function validateKey() {
			glWebAPI.getValidation().then(function(response) {
				( response.data ) ? console.log("API key valid.") : console.log("Server connection or API key failure. Please check API key and try again.")
			});
		};
 	 		
 	}]).controller("TitlesWeWantCtrl", ["$scope","glWebAPI", function($scope, glWebAPI) {
 	
 		// Open the Suggest New Title panel
 		$scope.toggleNewTitlePanelOn = function() {
 			console.log("Add title panel opened.");
 			return $scope.toggleNewTitlePanel = true;
 		}
 		
 		// Close the Suggest New Title panel
 		$scope.toggleNewTitlePanelOff = function() {
 			console.log("Closed the add title panel.");
 			return $scope.toggleNewTitlePanel = false;
 		}
 		
 		// Add a new suggestion to the Titles We Want list
 		$scope.suggestNewTitleTrigger = function(suggestedGame) {
 			console.log("New title has been submitted");
 			glWebAPI.getSuggestNewGame(suggestedGame).then(function(response) {
 				console.log ( response.data );
 				//$scope.title = { suggestedGame:"" };
 			});
 		}
 	
 	}]).controller("TitlesWeOwnCtrl", ["$scope", "glWebAPI", function($scope, glWebAPI) {
 	
 		// Sell the titles owned - clears all titles
 		$scope.sellAllTitles = function() {
			if ( confirm("Are You Sure?") ) { 
				glWebAPI.getSellAllGames().then(function(response) {
					( response.data ) ? console.log("Sold!") : console.log("Server issue. Please try again in a moment?")
				});
			} else {
				console.log("Canceled - for now!");
			}
 		}
 	
 	}]);
