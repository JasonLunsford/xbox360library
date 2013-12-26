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
 	
 		// Initialize on page load array
		$scope.gamesWeWantTable = [];
 		
 		// Populate the games we want array, and then push it to the view on page load
 		$scope.gamesWeWantTable = function() {
 			glWebAPI.getAllGames().then(function(response) {
 				for ( var i=0; i < response.data.length; i++ ) {
 					if ( response.data[i].status === "wantit" ) {
 						$scope.gamesWeWantTable = response.data;
 					}
 				}
 			});
 		}
 		$scope.gamesWeWantTable();
 	
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
 		$scope.suggestNewTitleTrigger = function() {
 			console.log("New title has been submitted");
 			glWebAPI.getSuggestNewGame($scope.suggestedGame).then(function(response) {
 				if ( response.data ) {
					glWebAPI.getAllGames().then(function(response) {
						var localGame = response.data.pop();
						$scope.gamesWeWantTable.push({
							title:localGame.title,
							id:localGame.id,
							votes:localGame.votes,
							status:localGame.status
						});
					});
 				}
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
