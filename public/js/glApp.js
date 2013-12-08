//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glApp.js
//
// Note: Define module and routing
//--------------------------------

"use strict";

// Declare app module with all necessary dependencies, and then configure URL routing
angular.module("gameLibrary", [
	"ngRoute",
	"gameLibrary.services",
	"gameLibrary.directives",
	"gameLibrary.controllers"
]).
config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when('/',
		{
			templateURL:"index.html",
			controller:"GameLibraryCtrl"
		})
		.when('/index',
		{
			templateURL:"index.html"
		})
		.otherwise({
			redirectTo:"/index.html" // heavy-handed redirect back to index.html
		})
}]);
