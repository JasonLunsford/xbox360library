//--------------------------------
// Our Xbox 360 Game Library
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
	"ngStorage",
	"gameLibrary.services",
	"gameLibrary.directives",
	"gameLibrary.controllers"
]).
config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when('/',
		{
			templateURL:"index.html",
			controller:"GameLibraryCtrl" // global controller, change if necessary
		})
		.when('/index',
		{
			templateURL:"index.html" // not really needed, given my .otherwise(), just an example
		})
		.otherwise({
			redirectTo:"/index.html" // heavy-handed redirect back to index.html
		})
}]);
