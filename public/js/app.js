var sortData = function(champ1, champ2, position) {
	champ1 = matchupData.championList[champ1].id;
	champ2 = matchupData.championList[champ2].id;
	return (champ1 < champ2) ? [champ1, champ2] : [champ2, champ1];
};


(function(angular, matchupData) {

	var appCore = angular.module('core', ['ui.bootstrap', 'championggTooltip']);

	appCore.run(['$templateCache', function($templateCache) {
		$templateCache.put('template/typeahead/typeahead-popup.html',
			'<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\','  +
				'left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">' +
			 		'<li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)"' +
					'ng-click="selectMatch($index)" role="option" id="{{match.id}}">' +
	            	'<div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>' +
	        '</li></ul>');

		$templateCache.put('menu.html', 
			'<a href="/champion/{{match.model.key}}">'+
	          '<div class="dropdown-img matchup-champion {{match.model.key}}"></div>'+
	          '<span bind-html-unsafe="match.label | typeaheadHighlight:query" class="dropdown-search"></span>'+
	      	'</a>');

	    $templateCache.put('template/tooltip/tooltip-popup.html', 
			'<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">'+ 
		      '<div class="tooltip-arrow"></div>'+
		      '<div class="tooltip-inner">{{content}}</div>'+
		    '</div>');
	}]);


	appCore.controller('searchCtrl', ['$scope', function($scope) {
		$scope.selected = undefined;
		$scope.championMenu = [];

		for (var prop in matchupData.championList) {
			if (Object.hasOwnProperty.call(matchupData.championList, prop)) {
				$scope.championMenu.push({
					key: matchupData.championList[prop].key,
					name: matchupData.championList[prop].name
				});
			}
		}

		$scope.getPage = function(){
			window.location.assign('/champion/'+ $scope.selected);
		};

		$scope.determineSend = function(keyCode) {
			if (keyCode === 13) {
				var name = $scope.selected.key || $scope.selected;
				window.location.assign('/champion/' + name);
			}
		};
	}]);

	appCore.factory('localStorageAccess', ['$window', '$rootScope', function($window, $rootScope) {
		angular.element($window).on('storage', function(event) {
			console.log('local storage changed');
			if (event.key === 'matchupRating' || event.key === 'chosenSort') {
				$rootScope.$apply();
			}
		});

		var service = {

			save: function(key, data) {
				localStorage[key] = angular.toJson(data);
				return this;
			},

			retrieve: function(key) {
				return angular.fromJson(localStorage[key]);
			}
		};

		return service;
	}]);


	appCore.filter('startsWith', function() {
		function strStartsWith(str, prefix) {
			var wordSplit = str.split(' ');

			function determineString(word) {
				return ((word + "").toLowerCase()).indexOf(prefix.toLowerCase()) === 0 || ((str + "").toLowerCase()).indexOf(prefix.toLowerCase()) === 0;
			}

			for (var i = 0; i < wordSplit.length; i++) {
				if (determineString(wordSplit[i])) {
					return true;
				}
			}
			return false;
		}


		return function(items, amount) {
			var filtered = [];

			angular.forEach(items, function(item) {
				if (strStartsWith(item.name || item.title, amount)) {
					filtered.push(item);
				}
			});

			return filtered;
		};
	});

})(angular, matchupData);