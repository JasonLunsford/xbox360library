//--------------------------------
// Our Xbox 360 Game Library
// Jason Lunsford
// v1.0
// glDirectives.js
//
// Note: Directives & Helpers
//--------------------------------

"use strict";

angular.module("gameLibrary.directives", []).
	// set focus on input field when Add Title button clicked
	directive("focusInput", ["$timeout", function($timeout) {
		// $timeout is used to ensure focus is called after DOM renders
		return {
			link: function(scope, element, attrs) {
				element.bind("click", function() {
					$timeout(function() {
						element.parent().parent().find("input")["0"].focus();
					});
				});
			}
		};
	// DOM level controls for each table row (via jQuery)
	// Controller for each button in each row
	}]).directive("activaterow", [function() {
		var linkFn;
		// embedding jQuery inside this link function
		linkFn = function(scope, element, attrs) {
		
			// targeting children instead of actual element b/c <td>s are easier to click on
			var targetTds = element.children();
					
			var toggleBtns = function() {
				// global settings reset
				$(this).parents("table").find("button").addClass("invisible");
				$(this).parents("table").find("td").removeClass("selectedRow");
				// enable new settings
				$(this).parent().find("button").toggleClass("invisible");
				$(this).parent().children().addClass("selectedRow");
			}
			
			targetTds.on("click", toggleBtns);
		};
		
		return {
			// explicit directive type (Attribute) declaration, just to keep things organized
			restrict:"A",
			// using an internal controller to handle buttons
		    controller: function($scope, glWebAPI, glRules) {
				
				// Chained promises for the Vote functionality, flattened for easy consumption
				var voteForTheGame = function(gameID) {
						// this callback bubbles up to the next function inline
						return glWebAPI
								.getVoteForNewGame(gameID)
								.then( function(voteResult)
								{
									// borrowing $scope (very) briefly to retain gameID
									$scope.gameID = gameID;
									// this value bubbles out, aka the fulfilled promise value
									return voteResult.data
								});
				    },
				    voteForTheGameGetLibrary = function(voteResult)
				    {
						return glWebAPI
								.getAllGames()
								.then( function(libraryResult)
								{
									if ( voteResult ) {
										// spin through master object of all returned games, find game with the gameID we voted for
										for ( var i=0; i < libraryResult.data.length; i++ ) {
											if ( libraryResult.data[i].id === $scope.gameID ) {
												var localGame = libraryResult.data[i];
												
												// game found and stored in localGame, now spin through smaller (separate) array of games we want; update vote count in View
												for ( var j=0; j < $scope.gamesWeWantTable.length; j++ ) {
													if ( $scope.gamesWeWantTable[j].id === $scope.gameID ) {
														$scope.gamesWeWantTable[j].votes = localGame.votes;
													}
												}
												return;
											}
										}
									} else {
										console.log("Server rejected vote. API key issues maybe?");
										return false;
									}
								});
					};
					
				// Chained promises for the Own It functionality
				var weOwnTheGame = function(gameID) {
						// this callback bubbles up to the next function inline
						return glWebAPI
								.getOwnThisGame(gameID)
								.then( function(purchaseResult)
								{
									// this callback bubble is the actual promise value
									return purchaseResult.data
								});
				    },
				    weOwnTheGameGetLibrary = function(purchaseResult)
				    {
						return glWebAPI
								.getAllGames()
								.then( function(libraryResult)
								{
									if ( purchaseResult ) {
										// expensive table rebuilds; done to ensure IE8 compatibility (IE8 does not like Array.prototype.splice() )
										// otherwise we'd pull out the target game from the want it array and inject it directly
										// into the own it table, without needing this server call / array repopulation
										$scope.gamesWeWantTable.length = 0;
										$scope.gamesWeOwnTable.length = 0;
										for ( var i=0; i < libraryResult.data.length; i++ ) {
											if ( libraryResult.data[i].status === "wantit" ) {
												$scope.gamesWeWantTable.push({
													title:libraryResult.data[i].title,
													id:libraryResult.data[i].id,
													votes:libraryResult.data[i].votes,
													status:libraryResult.data[i].status
												});
											} else if ( libraryResult.data[i].status === "gotit" ) {
												$scope.gamesWeOwnTable.push({
													title:libraryResult.data[i].title,
													id:libraryResult.data[i].id,
													votes:libraryResult.data[i].votes,
													status:libraryResult.data[i].status
												});
											}
										}
									} else {
										console.log("Possible server API issue. Please check key and try again.");
										return false;
									}
								});
					};
					
				// determine if voting allowed, given time and day
		        $scope.voteForMe = function(gameID) {
					var localWeekendCheck = ( glRules.getCurrentDay() === 6 ) ? true : ( glRules.getCurrentDay() === 0 ) ? true : false; // true, not a weekday
					var localOneFullDay   = ( (glRules.getStoredTime() + 24) >= glRules.getCurrentTime() ) ? true : false; // true, 24 hours have not passed
					
					if ( glRules.getStoredTime() >= 0 ) {
						if ( localOneFullDay || localWeekendCheck ) {
							// To Do: lock down UI / alert user
							console.log("You voted within the last 24 hours, or this is a weekend. Please try again later.");
						} else {
							console.log("Thank you for your new vote.");
							voteForTheGame( gameID ).then( voteForTheGameGetLibrary );
							glRules.setStoredTime();
						}
					} else {
						console.log("Thank you for your first vote.");
						voteForTheGame( gameID ).then( voteForTheGameGetLibrary );
						glRules.setStoredTime();
					}
					
					$scope.gameID = null; // clears value before promise fulfilled
		        };

		        $scope.weOwnThis = function(gameID) {
					weOwnTheGame( gameID ).then( weOwnTheGameGetLibrary );
					$scope.gameID = null;
		        };
		    },
			link:linkFn
		}
	}]);
