//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glServices.js
//
// Note: Services
//--------------------------------

"use strict";

// Web API Service
angular.module("gameLibrary.services", []).
	factory("glWebAPI", ["$http", function($http) {
		// My API Key
		var myApiKey 			= "ab0f25a613e2845ede3f258060050006";
		
		// Configure APIs
		var checkKeyURL 		= "http://js.nrd.mn/challenge/checkKey?callback=JSON_CALLBACK&apiKey="+myApiKey;
		var clearAllGamesURL 	= "http://js.nrd.mn/challenge/clearGames?callback=JSON_CALLBACK&apiKey="+myApiKey;
		var voteForGameURL 		= "http://js.nrd.mn/challenge/addVote?callback=JSON_CALLBACK&apiKey="+myApiKey+"&id=";
		var ownThisGameURL 		= "http://js.nrd.mn/challenge/setGotIt?callback=JSON_CALLBACK&apiKey="+myApiKey+"&id=";
		var suggestNewGameURL 	= "http://js.nrd.mn/challenge/addGame?callback=JSON_CALLBACK&apiKey="+myApiKey+"&title=";
		var getAllGamesURL 		= "http://js.nrd.mn/challenge/getGames?callback=JSON_CALLBACK&apiKey="+myApiKey;
		
		// prepare promise, no initial value
		var promise;
		
		// use Angular's http service in conjunction with the JSONP wrapper and Promise feature to allow async loading
 		promise = function(targetURL) {
 			return $http.jsonp(targetURL).success(function (data) {}).error(function () {});
 		}
		
		// No parameters passed
		var getValidation = function() {
			return promise(checkKeyURL);
		}
		
 		var clearAllGames = function() {
			return promise(clearAllGamesURL);
		}
		
 		var getAllGames = function() {
			return promise(getAllGamesURL);
		}

		// Requires game ID or game title
		var getVoteForNewGame = function(gameId) {
			var localVoteForGameURL = voteForGameURL+gameId;
			return promise(localVoteForGameURL);
		}
		
		var getOwnThisGame = function(gameId) {
			var localOwnThisGameURL = ownThisGameURL+gameId;
			return promise(localOwnThisGameURL);
		}
		
		var getSuggestNewGame = function(gameTitle) {
			var localSuggestNewGameURL = suggestNewGameURL+gameTitle;
			return promise(localSuggestNewGameURL);
		}
		
 		// reveal module pattern, makes for a clean API and easier reuse
 		return {
 			getValidation:getValidation,
 			clearAllGames:clearAllGames,
 			getAllGames:getAllGames,
 			getVoteForNewGame:getVoteForNewGame,
 			getOwnThisGame:getOwnThisGame,
 			getSuggestNewGame:getSuggestNewGame
 		}
 		
	}])
	.factory("glRules", ["$localStorage","$sessionStorage", function($localStorage,$sessionStorage) {
		
		// Modularize the timer for easy portability - yay code reuse!
		var glClock = (function() {
			// Private
			var my = {},
				internalClock,
				theDay,
				theTime,
				theTimeStamp;
				
			// fancy pants use of parseFloat is just to ensure Numbers are passed, and not strings pretending to be numbers
			function initGlClock() {
				 // prepare timestamp values to ensure consistent number of digits, therefore future calculations will work as expected
				 var now 	  	   = new Date();
				 var adjustedMonth = ( now.getMonth() <= 9 ) ? "0"+now.getMonth() : now.getMonth();
				 var adjustedDate  = ( now.getDate() <= 9 ) ? "0"+now.getDate() : now.getDate();
				 
				 theDay  	  = now.getDay();
				 theTime 	  = parseFloat(parseFloat(now.getHours()+(now.getMinutes()/60)+(now.getSeconds()/60)).toFixed(3));
				 theTimeStamp = parseInt(now.getFullYear()+adjustedMonth+adjustedDate, 10);
			}
			
			// Public
			my.startGlClock = function() { internalClock = setInterval(initGlClock, 1000); }
			my.stopGlClock  = function() { clearInterval(internalClock); }
			
			my.theDay 		= function() { return theDay; };
			my.theTime 		= function() { return theTime; };
			my.theTimeStamp = function() { return theTimeStamp; };
			
			return my;
		}());
		
		// Start clock ticking on page load
		glClock.startGlClock();
				
		// Set Time and Timestamp for consumption by controllers
		var setTimeAndTimeStamp = function() {
			$localStorage.storedTime 	  = glClock.theTime();
			$localStorage.storedTimeStamp = glClock.theTimeStamp();
		};
		
		var getStoredTime = function() {
			return $localStorage.storedTime;
		};
		
		var getStoredTimeStamp = function() {
			return $localStorage.storedTimeStamp;
		};
		
		var getCurrentDay = function() {
			return glClock.theDay();
		};
		
		var getCurrentTime = function() {
			return glClock.theTime();
		};
		
		var getCurrentTimeStamp = function() {
			return glClock.theTimeStamp();
		};

		var resetAll = function() {
			// stop the clock and clear local storage
			glClock.stopGlClock();
			$localStorage.$reset();
		};
		
 		return {
 			setTimeAndTimeStamp:setTimeAndTimeStamp,
 			getStoredTime:getStoredTime,
 			getStoredTimeStamp:getStoredTimeStamp,
 			getCurrentDay:getCurrentDay,
 			getCurrentTime:getCurrentTime,
 			getCurrentTimeStamp:getCurrentTimeStamp,
 			resetAll:resetAll
 		}
		
	}]);
