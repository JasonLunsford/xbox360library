//--------------------------------
// Our Xbox 360 Game Library
// Jason Lunsford
// v1.0
// glControllers.js
//
// Note: Main application controller
//--------------------------------

"use strict";

angular.module("gameLibrary.controllers", []).
	controller("GameLibraryCtrl", ["$scope","glWebAPI","glRules", function($scope, glWebAPI, glRules) {

 		// Initialize table arrays
		$scope.gamesWeWantTable = [];
		$scope.gamesWeOwnTable  = [];
		
		// Chained promises for the Own It functionality
		var suggestThisGame = function(gameSuggestion) {
				// this callback bubbles up to the next function inline
				return glWebAPI
						.getSuggestNewGame(gameSuggestion)
						.then( function(suggestionResult)
						{
							// this callback bubble is the actual promise value
							return suggestionResult.data
						});
			},
			suggestThisGameGetLibrary = function(suggestionResult)
			{
				return glWebAPI
						.getAllGames()
						.then( function(libraryResult)
						{
							if ( suggestionResult ) {
								var localGame = libraryResult.data.pop();
								
								$scope.gamesWeWantTable.push({
									title:localGame.title,
									id:localGame.id,
									votes:localGame.votes,
									status:localGame.status
								});
							} else {
								console.log("Possible server API issue. Please check key and try again.");
								return;
							}
						});
			};
		
 		
 		// Populate the games we want / games we own arrays, and then push them into the View on page load
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
		}());

 	
 		// Add Title button
 		$scope.toggleNewTitlePanelOn = function() {
 			return $scope.toggleNewTitlePanel = true;
 		}
 		
 		// Close Suggest New Title panel button
 		$scope.toggleNewTitlePanelOff = function() {
 			$scope.suggestedGame = null;
 			return $scope.toggleNewTitlePanel = false;
 		}
 		
 		// Submit Title button
 		$scope.suggestNewTitleTrigger = function() {
			// locals
			var localTestTitle,
				localFreshSuggestion = $scope.suggestedGame.toLowerCase();
			
			// check for weekend, and whether last action happened within 24 hours (or just at the 24 hour mark)
			var localWeekendCheck = ( glRules.getCurrentDay() === 6 ) ? true : ( glRules.getCurrentDay() === 0 ) ? true : false; // true, not a weekday
			var localOneFullDay   = ( (glRules.getStoredTime() + 24) >= glRules.getCurrentTime() ) ? true : false; 				 // true, 24 hours have not passed

			for (var i=0; i < $scope.gamesWeWantTable.length; i++ ) {
				localTestTitle = $scope.gamesWeWantTable[i].title.toLowerCase();
				if ( localTestTitle === localFreshSuggestion ) {
					console.log("Oops - someone already made that suggestion. Try another title?");
					$scope.suggestedGame = null;
					return; // exits the entire function
				}
			}
			
			// determine if suggesting allowed, given time and day
			if ( glRules.getStoredTime() >= 0 ) {
				if ( localOneFullDay || localWeekendCheck ) {
					// To Do: lock down UI / alert user
					console.log("You suggested a title within the last 24 hours, or this is a weekend. Please try again later.");
				} else {
					console.log("Thank you for your new title suggestion.");
					suggestThisGame( $scope.suggestedGame ).then( suggestThisGameGetLibrary );
					glRules.setStoredTime();
				}
			} else {
				console.log("Thank you for your first title suggestion.");
				suggestThisGame( $scope.suggestedGame ).then( suggestThisGameGetLibrary );
				glRules.setStoredTime();
			}

			$scope.suggestedGame = null;
 		}
 		
 		// Application Reset
 		$scope.resetApplication = function() {
			if ( confirm("Are You Sure?") ) { 
				glWebAPI.clearAllGames().then(function(response) {
					if ( response.data ) {
						$scope.gamesWeWantTable.length = 0;
						$scope.gamesWeOwnTable.length = 0;
						$scope.suggestedGame = null;
						glRules.resetAll();
						return $scope.toggleNewTitlePanel = false;
					} else {
						console.log("Possible server API issue. Please check key and try again.")
					}
				});
			} else {
				console.log("Reset cancelled.");
			}
 		}
		 	 		
 	}]);
