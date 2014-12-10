
	var sortData = function(champ1, champ2, position){
  		champ1 = matchupData.championList[champ1].id;
  		champ2 = matchupData.championList[champ2].id;
  		return (champ1 < champ2) ? [champ1, champ2] : [champ2, champ1];
	};
	

	(function(angular, matchupData){

	var appCore = angular.module( 'core', ['ui.bootstrap']);

	appCore.controller('searchCtrl', ['$scope', function($scope){
		  $scope.selected = undefined;

		  $scope.championMenu = [];

		  for(var prop in matchupData.championList){
		  	if(Object.hasOwnProperty.call(matchupData.championList, prop)){
		  		$scope.championMenu.push({
		  			key: matchupData.championList[prop].key,
		  			name: matchupData.championList[prop].name
		  		});
		  	}
		  }

		  $scope.determineSend = function(keyCode){
		  	if(keyCode === 13){
		  		window.location.assign('/champion/'+$scope.selected.key);
		  	}
		  };

  	}]);

  	appCore.factory('localStorageAccess', ['$window','$rootScope', function ($window, $rootScope) {
	    angular.element($window).on('storage', function(event) {
		console.log('local storage changed');
		    if (event.key === 'matchupRating' || event.key === 'chosenSort') {
		      $rootScope.$apply();
		    }
		  });

	    var service = {

	        save: function (key, data) {
	            localStorage[key] = angular.toJson(data);
	            return this;
	        },

	        retrieve: function (key) {
	            return angular.fromJson(localStorage[key]);
	        }
	    };

	    return service;
	}]);



	appCore.filter('startsWith', function() {

	   function strStartsWith(str, prefix) {
	   	var wordSplit = str.split(' ');

	   	function determineString(word){
	   		return ((word+"").toLowerCase()).indexOf(prefix.toLowerCase()) === 0 || ((str+"").toLowerCase()).indexOf(prefix.toLowerCase()) === 0;
	   	}
	   	
	   	for(var i=0;i<wordSplit.length;i++){
	   		if(determineString(wordSplit[i])){
	   			return true;
	   		}
	   	}
	    return false;
	   }


	   return function( items, amount) {


	    var filtered = [];

	    angular.forEach(items, function(item) {
	      if(strStartsWith(item.name || item.title, amount)){
	        filtered.push(item);
	      }
	    });

	    return filtered;
	  };
	});

	})(angular, matchupData);