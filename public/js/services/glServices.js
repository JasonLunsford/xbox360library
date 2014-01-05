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
		
		var glClock;

		glClock = {
			init : function()
			{
				return console.log("hello world");
			}	
		}

		setInterval(glClock.init(), 1000);
				
		var setDayAndTime = function() {
			//$localStorage.currentDay = parseInt(setNowObj.getDay(), 10);
			//$localStorage.currentTime = parseFloat(setNowObj.getHours()+(setNowObj.getMinutes() / 60));
			$localStorage.currentDay  = glClock.getTheDay();
			$localStorage.currentTime = glClock.getTheTime();
		};
		
		var getStoredDay = function() {
			return $localStorage.currentDay;
		};
		
		var getStoredTime = function() {
			return $localStorage.currentTime;
		};
		
		var getCurrentDay = function() {
			return glClock.getTheDay();
			//return parseInt(setDayNowObj.getDay(), 10);
		};
		
		var getCurrentTime = function() {
			return glClock.getTheTime();
			//return parseFloat(setTimeNowObj.getHours()+(setTimeNowObj.getMinutes() / 60));
		};

		var resetAll = function() {
			// reset all counters
			$localStorage.$reset();
		};
		
 		return {
 			setDayAndTime:setDayAndTime,
 			getStoredDay:getStoredDay,
 			getStoredTime:getStoredTime,
 			getCurrentDay:getCurrentDay,
 			getCurrentTime:getCurrentTime,
 			resetAll:resetAll
 		}
		
	}]);
