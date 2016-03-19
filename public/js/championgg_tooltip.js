(function(angular, matchupData) {

	var champggTooltip = angular.module('championggTooltip', []);

	
	champggTooltip.filter('to_trusted', ['$sce', function($sce) {
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}]);

	
	champggTooltip.factory('ToolTip', ['$window', function($window){
		return {
			determineDirection: function(position, tipDetails, width){
				var ref = position;
				var newWidth = 240 || width;
				var cssObj = {
					"opacity":1,
					"top" : ref.bottom - ref.height - tipDetails.height + $window.scrollY + "px",
					"left" : ref.right - (newWidth - ((newWidth - ref.width)/2)) + $window.scrollX + "px",
					"height" : "auto",
					"width" : newWidth + "px"
				};
				return cssObj;
			},
			getTemplate: function(tElement, tAttrs){
				var beginning = "<div class='primary-content'>";
				var obj = {
					masteries: "<div ng-if=\"tooltipContent\"><h4>{{tooltipContent.name}}</h4>"+
								"<div class=\"description\" ng-repeat=\"tip in tooltipContent.description\">"+ 
								"<div ng-class=\"{'highlight' : $index == apiSecondaryId}\" ng-bind-html=\"tip | to_trusted\">"+ 
								"</div></div></div>"
				};
				var end = "<div ng-if=\"!tooltipContent\">Loading...</div>"+
						"</div><div class='arrow-down'></div>";
				return beginning + obj[tAttrs.apiType] + end;
			}
		};
	}]);
	

	champggTooltip.directive('toolContainer', ['ToolTip', '$timeout', '$http', function(ToolTip, $timeout, $http){
		return {
			restrict: "E", 
			template:  ToolTip.getTemplate,
			scope:{
				position:"=",
				apiType: "@",
				apiPrimaryId: "@",
				apiSecondaryId: "@"
			},
			link: function(scope, elem, attr){
				elem.addClass('tooltip-hover');

				var adjustCss = function(){     
					scope.tipDetails = elem[0].getBoundingClientRect();
					elem.css(ToolTip.determineDirection(scope.position, scope.tipDetails));
				};
				
				$timeout(function(){
					adjustCss();
				}, 1);

				scope.tooltipContent = false;
				scope.$watch('tooltipContent', function(){
					$timeout(function(){
						adjustCss();
					}, 1);
				}, true);

				$http.get('/static/'+scope.apiType+'/'+scope.apiPrimaryId).success(function(data, status, headers, config){
					scope.tooltipContent = data; 
				}).error(function(data,status,headers,config){
					console.log(data);
				});
				 
			}
		};
	}]);

	champggTooltip.directive('championTip', ['$compile', '$timeout', function($compile, $timeout){
		return {
			restrict: "A", 
			scope:{
				apiType: "@",
				apiPrimaryId: "@",
				apiSecondaryId: "@"
			},
			controller: ['$scope', function($scope){
				$scope.positionInfo = {};
			}],
			link: function(scope, elem, attr){
				var elemCopy = elem;
				var timed = [];
				mouseenterFunction = function(){
					timed[timed.length] = $timeout(function(){
						scope.positionInfo = this.getBoundingClientRect();                    
						var currentToolTip = "<tool-container api-type="+scope.apiType+" api-primary-id="+scope.apiPrimaryId+" api-secondary-id="+(scope.apiSecondaryId || 'none')+" position='positionInfo' class='currentTooltip'></tool-container>";
						var tool = $compile(currentToolTip)(scope);
						angular.element(document.getElementsByTagName('body')[0]).prepend(tool);
					}.bind(this), 50);
				};

				mouseoutFunction = function(){
					for(var y = 0; y < timed.length; y++){
						$timeout.cancel(timed[y]);
					}
					
					var ref = angular.element(document.getElementsByClassName('currentTooltip'));
					for(var i = 0; i < ref.length; i++){
						ref[i].remove();
					}
				};

				elem.bind('mouseover', mouseenterFunction);
				elem.bind('mouseleave', mouseoutFunction);

			}
		};
	}]);

})(angular, matchupData);