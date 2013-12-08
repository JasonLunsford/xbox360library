//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glDirectives.js
//
// Note: Directives & Helpers
//--------------------------------

"use strict";

// Add more directives via .directive("directiveName"...)
angular.module("gameLibrary.directives", []).
	directive("titlesweownview", [function() {
		return {
			restrict:"E",
			replace:true,
			templateUrl:"partials/titlesweown.html", // load partial view via AJAX
		};
	}]).directive("titleswewantview", [function() {
		return {
			restrict:"E",
			replace:true,
			templateUrl:"partials/titleswewant.html" // load partial view via AJAX
		}
	}]).directive("radiobuttonrow", [function() {
		return {
			restrict:"A",
			scope:{},
			link: function(scope, element, attrs) {
				element.bind("click", function() {
					console.log( element.attrs );
				})
			}
		}
	}]);
