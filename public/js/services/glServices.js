//--------------------------------
// Our Xbox 360 Game Library
// Jason Lunsford
// v1.0
// glServices.js
//
// Note: Services
//
// A special shout out to Nerdery.com for allowing me the use of their Web APIs for the duration of 
// the first version of this project. Very clean and well documented. Thank you!
//
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
				theTime;

			function initGlClock() {
				 var now 	   = new Date();
				 var mySeconds = now.getTime() / 1000; // get seconds since epoch
				 
				 theDay  	   = now.getDay();
				 theTime 	   = parseFloat(parseFloat((mySeconds / 60) / 60).toFixed(3)); // convert seconds to hours, rounded to 3, reconverted to a Number
			}
			
			// Public
			my.startGlClock = function() { internalClock = setInterval(initGlClock, 1000); }
			my.stopGlClock  = function() { clearInterval(internalClock); }
			
			my.theDay 		= function() { return theDay; };
			my.theTime 		= function() { return theTime; };
			
			return my;
		}());
		
		// Start clock ticking on page load
		glClock.startGlClock();
				
		// Set Time in HTML5 Local Storage for consumption by controllers
		var setStoredTime = function() {
			$localStorage.storedTime = glClock.theTime();
		};
		
		var getStoredTime = function() {
			return $localStorage.storedTime;
		};
				
		var getCurrentDay = function() {
			return glClock.theDay();
		};
		
		var getCurrentTime = function() {
			return glClock.theTime();
		};
		
		var resetAll = function() {
			// stop the clock and clear local storage
			glClock.stopGlClock();
			$localStorage.$reset();
		};
		
 		return {
 			setStoredTime:setStoredTime,
 			getStoredTime:getStoredTime,
 			getCurrentDay:getCurrentDay,
 			getCurrentTime:getCurrentTime,
 			resetAll:resetAll
 		}
		
	}]);
