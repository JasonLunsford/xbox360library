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
							// if the Want -> Own process failed (due to server rejection - likely API key failure), this View update will not happen
							if ( suggestionResult ) {
								var localGame = libraryResult.data.pop();
								
								$scope.gamesWeWantTable.push({
									title:localGame.title,
									id:localGame.id,
									votes:localGame.votes,
									status:localGame.status
								});
							} else {
								console.log("Server rejected vote. API key issues maybe?");
								return false;
							}
						});
			};
		
 		
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
			var localDayDelta  = glRules.getCurrentDay() - glRules.getStoredDay();
			var localTimeDelta = glRules.getCurrentTime() - glRules.getStoredTime();
			var localWeekend   = ( glRules.getCurrentDay() === 6 ) ? true : ( glRules.getCurrentDay() === 0 ) ? true : false;
			
			if ( glRules.getStoredDay() >= 0 ) {
				if ( localDayDelta === 0 || localWeekend ) {
					console.log("sorry can't vote / suggest - either too soon or a weekend, action DENIED!");
					console.log(glRules.getCurrentTime());
					console.log(glRules.getStoredTime());
				} else if ( localDayDelta === 1 ) {
					if ( localTimeDelta >= 0 ) {
						console.log("at least 24 hours since last vote / suggestion, action approved!");
					} else {
						console.log("less than 24 hours have passed since last vote / suggestion, action DENIED!");
					}
				} else {
					console.log("more than one day has passed since last vote / suggestion, action approved!");
					// add voting logic here
					// glRules.setDayAndTime();
				}
			} else {
				console.log("first vote / suggestion");
				glRules.setDayAndTime();
			}
			suggestThisGame( $scope.suggestedGame ).then( suggestThisGameGetLibrary );
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
						console.log("Server issue. Please try again in a moment.")
					}
				});
			} else {
				console.log("Canceled - for now!");
			}
 		}
		 	 		
 	}]);
