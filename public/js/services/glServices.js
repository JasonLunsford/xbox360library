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
		// TEST SERVICE, CHECKS FOR API KEY VALIDITY - API CALL
		var checkKeyURL 	= "http://js.nrd.mn/challenge/checkKey?callback=JSON_CALLBACK&apiKey=";
		var validate		= checkKeyURL+myApiKey;
		var promise;

		// use Angular's http service in conjunction with the JSONP wrapper and Promise feature to allow async loading
 		promise = $http.jsonp(validate).success(function (data) {}).error(function () {});
 		return promise;
 		
	}]).factory("sellAllGames", ["$http", function($http) {
		// SELL ALL GAMES SERVICE - API CALL
		var sellGamesURL 	= "http://js.nrd.mn/challenge/clearGames?callback=JSON_CALLBACK&apiKey=";
		var sellGames		= sellGamesURL+myApiKey;
		var promise;

		// use Angular's http service in conjunction with the JSONP wrapper and Promise feature to allow async loading
 		promise = $http.jsonp(sellGames).success(function (data) {}).error(function () {});
 		return promise;
 		
	}]).factory("voteForNewGame", ["$http", function($http) {
		// VOTE FOR GAME WE WANT - API CALL
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
		// INDICATE WE OWN THIS GAME, SHIFT TO LEFT TABLE - API CALL
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
		// ADD GAME TO TITLES WE WANT LIST (SUGGESTED TITLES) - API CALL
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
		// GET OUR ENTIRE GAME LIBRARY - API CALL
		var getAllGamesURL 		= "http://js.nrd.mn/challenge/getGames?callback=JSON_CALLBACK&apiKey=";
		var getAllGames			= getAllGamesURL+myApiKey;
		var promise;
		
		// Cache buster, forces browser to fetch data from server not the cache due to unique time stamp attached to URL
		var cacheBuster			= "&_=" + (new Date().getTime());
		
		// Final URL
		getAllGames = getAllGames+cacheBuster;

		// use Angular's http service in conjunction with the JSONP wrapper and Promise feature to allow async loading
		// cache this request incase no other requests made - will make next (fresh) load faster
 		promise = $http.jsonp(getAllGames).success(function (data) {}).error(function () {});
 		return promise;
	
	}]).factory("getAllCachedGames", ["$http", function($http) {
		// GET OUR ENTIRE GAME LIBRARY FROM CACHE
		var getAllGamesURL 		= "http://js.nrd.mn/challenge/getGames?callback=JSON_CALLBACK&apiKey=";
		var getAllGames			= getAllGamesURL+myApiKey;
		var promise;

		// use Angular's http service in conjunction with the JSONP wrapper and Promise feature to allow async loading
		// since Angular inserts a the <script> for us when using JSONP, the URL never changes. therefore the browser will cache this script and the results
 		promise = $http.jsonp(getAllGames, { cache:true }).success(function (data) {}).error(function () {});
 		return promise;
	
	}]);
