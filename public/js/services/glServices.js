//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glServices.js
//
// Note: Services
//--------------------------------

"use strict";

angular.module("gameLibrary.services", []).
	factory("checkAPI", ["$rootScope", "$http", "$q", function($rootScope, $http, $q) {
		// separate key from URL for easy updating
		var myApiKey		= "ab0f25a613e2845ede3f258060050006";

		// Keep handy for quick validation 		
		var checkKeyURL 	= "http://js.nrd.mn/challenge/checkKey?callback=JSON_CALLBACK&apiKey=";
		var validate		= checkKeyURL+myApiKey;

 		var promise = $http.jsonp(validate).success(function (data) {}).error(function () {});
 		return promise;
	}]);
