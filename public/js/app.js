//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// app.js
//
// Note: define and configure all modules here
//--------------------------------

var app = angular.module("gameLibrary", [])

app.controller("GameLibraryCtrl", function($scope) {

	// Grab the UI interaction elements we need
	var addNewTitlePanel = angular.element('.addNewTitlePanel')

	$scope.showTitleBox = function() {
		addNewTitlePanel.removeClass("hidden");
	}

	$scope.hideTitleBox = function() {
		addNewTitlePanel.addClass("hidden");
	}
})

app.directive("titlesWeOwnView", function() {
	return {
		restrict:"E",
		templateUrl:"views/titlesWeOwn.html"
	}
})
