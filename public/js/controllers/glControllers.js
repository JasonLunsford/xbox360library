//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glControllers.js
//
// Note: Main application controller
//--------------------------------

"use strict";

angular.module("gameLibrary.controllers", []).
	controller("GameLibraryCtrl", ["$scope","glWebAPI", function($scope, glWebAPI) {

		// Uncomment and run to do a quick API Key validation check
		//validateKey();
		
 		// Initialize table arrays
		$scope.gamesWeWantTable = [];
		$scope.gamesWeOwnTable  = [];
 		
 		// Populate the games we want array, and then push it to the view on page load
		(function() {
			glWebAPI.getAllGames().then(function(response) {
				for ( var i=0; i < response.data.length; i++ ) {
					if ( response.data[i].status === "wantit" ) {
						$scope.gamesWeWantTable.push({
							title:response.data[i].title,
							id:response.data[i].id,
							votes:response.data[i].votes,
							status:response.data[i].status
						});
					} else if ( response.data[i].status === "gotit" ) {
						$scope.gamesWeOwnTable.push({
							title:response.data[i].title,
							id:response.data[i].id,
							votes:response.data[i].votes,
							status:response.data[i].status
						});
					}
				}
			});
		})();
 	
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
 			glWebAPI.getSuggestNewGame($scope.suggestedGame).then(function(response) {
				( response.data ) ? console.log("Game submitted successfully.") : console.log("API Key issue. Please check the key and try again.")
 			});
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
 		
 		// Application Reset
 		$scope.resetApplication = function() {
			if ( confirm("Are You Sure?") ) { 
				glWebAPI.clearAllGames().then(function(response) {
					if ( response.data ) {
						$scope.gamesWeWantTable.length = 0;
					} else {
						console.log("Server issue. Please try again in a moment.")
					}
				});
			} else {
				console.log("Canceled - for now!");
			}
 		}
		
		// Utility function to check API key - remove for production
		function validateKey() {
			glWebAPI.getValidation().then(function(response) {
				( response.data ) ? console.log("API key valid.") : console.log("Server connection or API key failure. Please check API key and try again.")
			});
		};
 	 		
 	}]);
