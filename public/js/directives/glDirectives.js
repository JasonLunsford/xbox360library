//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glDirectives.js
//
// Note: Directives & Helpers
//--------------------------------

"use strict";

// Add more directives via .directive("directiveName"...)
angular.module("gameLibrary.directives", []).
	directive("titlesweownview", [function() {
		return {
			restrict:"E",
			replace:true,
			templateUrl:"partials/titlesweown.html", // load partial view via AJAX
		};
	}]).directive("titleswewantview", [function() {
		var linkFn;
		// embedding some jQuery inside this link function until my AngularFu is better
		linkFn = function(scope, element, attrs) {
		

		};
		
		return {
			restrict:"E",
			replace:true,
			templateUrl:"partials/titleswewant.html", // load partial view via AJAX
			// using an internal controller to handle buttons, no directive scope set up yet
		    controller: function($scope, glWebAPI) {

			},
			link:linkFn
		}
	}]).directive("activaterow", [function() {
		var linkFn;
		// embedding some jQuery inside this link function until my AngularFu is better
		linkFn = function(scope, element, attrs) {
		
			// targeting children instead of actual element b/c the <td>s are easier to click on
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
			// explicit directive type declaration, just to keep things organized
			restrict:"A",
			// using an internal controller to handle buttons, using parent scope
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
									// if the Voting process failed (due to server rejection - likely API key failure), this View update will not happen
									if ( voteResult ) {
										// spin through master object of all returned games, find the game with the gameID that we registered a vote for
										for ( var i=0; i < libraryResult.data.length; i++ ) {
											if ( libraryResult.data[i].id === $scope.gameID ) {
												var localGame = libraryResult.data[i];
												
												// game found and stored in localGame, now spin through smaller array of games we want, and update vote count in the View
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
									// if the Want -> Own process failed (due to server rejection - likely API key failure), this View update  will not happen
									if ( purchaseResult ) {
										// extremely expensive table rebuilds, but done to ensure IE8 compatibility (IE8 does not like Array.prototype.splice() )
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
										console.log("Server rejected vote. API key issues maybe?");
										return false;
									}
								});
					};
					
					
		        $scope.voteForMe = function(gameID) {
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
					voteForTheGame( gameID ).then( voteForTheGameGetLibrary );
					$scope.gameID = null; // this works because it will run before promise gets fulfilled
		        };

		        $scope.weOwnThis = function(gameID) {
					weOwnTheGame( gameID ).then( weOwnTheGameGetLibrary );
					$scope.gameID = null; // this works because it will run before promise gets fulfilled
		        };
		    },
			link:linkFn
		}
	}]);
