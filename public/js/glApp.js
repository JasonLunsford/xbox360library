//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// app.js
//
// Note: define and configure all modules here
//--------------------------------

var app = angular.module("gameLibrary", ["ngRoute"])

// Configs
//--------------------------------

app.config(function ($routeProvider) {
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
			redirectTo:"/"
		})
})


// Controllers
//--------------------------------

app.controller("GameLibraryCtrl", function($scope) {
 
})


// UI Events (Directives)
//--------------------------------

app.directive("selectthisradio", function() {
    return {
    	scope:{},
    	link: function(scope, element, attrs) {
		    element.bind("click", function() {
				element.find("input").attr("checked",true);
		    })
		}
	}
})


// View Injections (Directives)
//--------------------------------
app.directive("titlesweownview", function() {
	return {
		restrict:"E",
		replace:true,
		templateUrl:"titlesweown.html"
	}
})

app.directive("titleswewantview", function() {
	return {
		restrict:"E",
		replace:true,
		templateUrl:"titleswewant.html"
	}
})
