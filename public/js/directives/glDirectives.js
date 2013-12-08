//--------------------------------
// JS NAT Challenge Core JS
// Jason Lunsford
// v1.0
// glDirectives.js
//
// Note: Directives
//--------------------------------

"use strict";

// Add more directives via .directive("directiveName"...)
angular.module("gameLibrary.directives", []).
	directive("titlesweownview", [function() {
		return {
			restrict:"E",
			replace:true,
			templateUrl:"partials/titlesweown.html"
		};
	}]).directive("titleswewantview", [function() {
		return {
			restrict:"E",
			replace:true,
			templateUrl:"partials/titleswewant.html"
		}
	}]).directive("selectthisradio", [function() {
		return {
			scope:{},
			link: function(scope, element, attrs) {
				element.bind("click", function() {
					element.find("input").attr("checked",true);
				})
			}
		}
	}]);
