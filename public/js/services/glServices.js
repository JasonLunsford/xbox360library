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
		var sellGamesURL 		= "http://js.nrd.mn/challenge/clearGames?callback=JSON_CALLBACK&apiKey="+myApiKey;
		var voteForGameURL 		= "http://js.nrd.mn/challenge/addVote?callback=JSON_CALLBACK&apiKey="+myApiKey+"&id=";
		var ownThisGameURL 		= "http://js.nrd.mn/challenge/setGotIt?callback=JSON_CALLBACK&apiKey="+myApiKey+"&id=";
		var suggestNewGameURL 	= "http://js.nrd.mn/challenge/addGame?callback=JSON_CALLBACK&apiKey="+myApiKey+"&title=";
		var getAllGamesURL 		= "http://js.nrd.mn/challenge/getGames?callback=JSON_CALLBACK&apiKey="+myApiKey;
		
		// prepare promise, no initial value
		var promise;
		
		// by my convention, only place "var" in front of function variables that will be pubically available
		// use Angular's http service in conjunction with the JSONP wrapper and Promise feature to allow async loading
 		promise = function(targetURL) {
 			return $http.jsonp(targetURL).success(function (data) {}).error(function () {});
 		}
		
		// No parameters passed
		var getValidation = function() {
			return promise(checkKeyURL);
		}
		
 		var getSellAllGames = function() {
			return promise(sellGamesURL);
		}
		
 		var getAllGames = function() {
 			//var unPackMe;
 			//var thePromise = promise(getAllGamesURL);
 			//for (i=0; i < thePromise
 			// try unpacking the array, and sending that as a simple object?
			return promise(getAllGamesURL);
		}

		// Requires game ID or game title
		var getVoteForNewGame = function(gameId) {
			voteForGameURL = voteForGameURL+gameId;
			return promise(voteForGameURL);
		}
		
		var getOwnThisGame = function(gameId) {
			ownThisGameURL = ownThisGameURL+gameId;
			return promise(ownThisGameURL);
		}
		
		var getSuggestNewGame = function(gameTitle) {
			suggestNewGameURL = suggestNewGameURL+gameTitle;
			return promise(suggestNewGameURL);
		}
		
 		// reveal module pattern, makes for a clean API and easier reuse
 		return {
 			getValidation:getValidation,
 			getSellAllGames:getSellAllGames,
 			getAllGames:getAllGames,
 			getVoteForNewGame:getVoteForNewGame,
 			getOwnThisGame:getOwnThisGame,
 			getSuggestNewGame:getSuggestNewGame
 		}
 		
	}]);
