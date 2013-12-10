//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glServices.js
//
// Note: Services
//--------------------------------

"use strict";

// My API Key
var myApiKey = "ab0f25a613e2845ede3f258060050006";

// Collection of Web APIs
angular.module("gameLibrary.services", []).
	factory("checkAPIkey", ["$http", function($http) {
		// TEST SERVICE, CHECKS FOR API KEY VALIDITY
		var checkKeyURL 	= "http://js.nrd.mn/challenge/checkKey?callback=JSON_CALLBACK&apiKey=";
		var validate		= checkKeyURL+myApiKey;
		var promise;

		// use Angular's http service in conjunction with the JSONP wrapper and Promise feature to allow async loading
 		promise = $http.jsonp(validate).success(function (data) {}).error(function () {});
 		return promise;
 		
	}]).factory("sellAllGames", ["$http", function($http) {
		// SELL ALL GAMES SERVICE
		var sellGamesURL 	= "http://js.nrd.mn/challenge/clearGames?callback=JSON_CALLBACK&apiKey=";
		var sellGames		= sellGamesURL+myApiKey;
		var promise;

		// use Angular's http service in conjunction with the JSONP wrapper and Promise feature to allow async loading
 		promise = $http.jsonp(sellGames).success(function (data) {}).error(function () {});
 		return promise;
 		
	}]).factory("voteForNewGame", ["$http", function($http) {
		// VOTE FOR GAME WE WANT	
		var voteForGameURL 		= "http://js.nrd.mn/challenge/addVote?callback=JSON_CALLBACK&apiKey=";
		var voteForGame, promise;
		
		// setter method for controller to collect title ID, and then kick off communications
		return {
			setTitleID: function (id) {
				voteForGame		= voteForGameURL+myApiKey+"&id="+id;

		 		promise = $http.jsonp(voteForGame).success(function (data) {}).error(function () {});
		 		return promise;
			}
		};
	
	}]).factory("ownThisGame", ["$http", function($http) {
		// INDICATE WE OWN THIS GAME, SHIFT TO LEFT TABLE	
		var ownThisGameURL 		= "http://js.nrd.mn/challenge/setGotIt?callback=JSON_CALLBACK&apiKey=";
		var ownThisGame, promise;
		
		// setter method for controller to collect title ID, and then kick off communications
		return {
			setOwnThisID: function (id) {
				ownThisGame		= ownThisGameURL+myApiKey+"&id="+id;

		 		promise = $http.jsonp(ownThisGame).success(function (data) {}).error(function () {});
		 		return promise;
			}
		};
	
	}]).factory("suggestNewTitle", ["$http", function($http) {
		// ADD GAME TO TITLES WE WANT LIST (SUGGESTED TITLES)	
		var suggestNewTitleURL 		= "http://js.nrd.mn/challenge/addGame?callback=JSON_CALLBACK&apiKey=";
		var suggestNewTitle, promise;
		
		// setter method for controller to pass suggested title name, and then kick off communications
		return {
			setSuggestedTitle: function (title) {
				suggestNewTitle		= suggestNewTitleURL+myApiKey+"&title="+title;

		 		promise = $http.jsonp(suggestNewTitle).success(function (data) {}).error(function () {});
		 		return promise;
			}
		};
	
	}]).factory("getAllGames", ["$http", function($http) {
		// GET OUR ENTIRE GAME LIBRARY	
		var getAllGamesURL 		= "http://js.nrd.mn/challenge/getGames?callback=JSON_CALLBACK&apiKey=";
		var getAllGames			= getAllGamesURL+myApiKey;
		var promise;

		// use Angular's http service in conjunction with the JSONP wrapper and Promise feature to allow async loading
 		promise = $http.jsonp(getAllGames).success(function (data) {}).error(function () {});
 		return promise;
	
	}]);
