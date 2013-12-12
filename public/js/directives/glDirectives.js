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
	}]).directive("activaterow", [function() {
		var linkFn;
		// embedding some jQuery inside this link function until my AngularFu is better
		linkFn = function(scope, element, attrs) {
		
			// targeting children instead of actual element b/c the <td>s are easier to click on
			var targetTds = element.children();
		
			var toggleBtns = function() {
				// global settings reset
				$(this).parents("table").find("button").addClass("invisible");
				$(this).parents("table").find("td").removeClass("selectedRow");
				// enable new settings
				$(this).parent().find("button").toggleClass("invisible");
				$(this).parent().children().addClass("selectedRow");
			}
			
			targetTds.on("click", toggleBtns);
		};
		
		return {
			// explicit directive type declaration, just to keep things organized
			restrict:"A",
			// using an internal controller to handle buttons, no directive scope set up yet
		    controller: function($scope, glWebAPI) {
		        $scope.voteForMe = function() {
		            console.log("Vote for this title!");
		        };

		        $scope.weOwnThis = function() {
		            console.log("We own this title, add it to the other column.");
		        };
		    },
			link:linkFn
		}
	}]);
