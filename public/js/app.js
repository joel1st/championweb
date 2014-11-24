
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

  	appCore.controller('matchupRating', ['$scope', '$http', 'localStorageAccess', function($scope, $http, localStorageAccess){

		  $scope.ratingLength = [5,4,3,2,1];

		  var determineRatingRole = function(matchType, role){
		  	return (matchType === 'synergy' || matchType === 'adcsupport') ? matchType.toUpperCase() : role;
		  };

		  var findRating = function(){
		  	return localStorageAccess.retrieve('matchupRating');
		  };

		  var saveRating = function(allData, newData, roles, updateClientObj){
		  	var sendData = {
		  		champ1: newData.champs[0],
		  		champ2: newData.champs[1],
		  		vote1: newData.rating[0],
		  		vote2: newData.rating[1],
		  		champ1Role: roles[0],
		  		champ2Role: roles[1],
		  		role: newData.role
		  	};
		  	$http.post('/sendmatchup', sendData).
			  success(function(data, status, headers, config) {
			  	if(updateClientObj){
			  		updateClientRatings(updateClientObj.matchupKey, updateClientObj.rating, updateClientObj.matchType, updateClientObj.previousRating);
			  	}
			  	localStorageAccess.save('matchupRating', allData);
			    // this callback will be called asynchronously
			    // when the response is available
			  }).
			  error(function(data, status, headers, config) {
			  	if(status===404){
			  		alert('This matchup no longer exists, Chances are we just performed an update and there wasn\'t enough fresh data to continue displaying this matchup.');
			  	} else if(status===503){
			  		alert('We\'re currently performing vote updates to the site, voting should be back up soon.');
			  	} else if(!status){
			  		alert('Unable to connect to the Champion.gg server! Refresh the page and try again!');
			  	}
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
		  	
		  };

		  var updateClientRatings = function(champ1, rating, matchType, previousRating){
		  	var userScore, ratings, index;

		  	for(var t=0;t<$scope.allMatchups[matchType].length;t++){
		  		if($scope.allMatchups[matchType][t].key === champ1){
		  			userScore = $scope.allMatchups[matchType][t].userScore;
		  			ratings = $scope.allMatchups[matchType][t].ratings;
		  			index = t;
		  		}
		  	}
		  	if(previousRating){		
		  		// 5*7
		  		console.log(rating);
		  		console.log(previousRating);
		   		userScore = (((userScore*ratings)+(rating-previousRating))/ratings);
		  	} else {
		  		userScore = (((userScore*ratings)+rating)/(ratings+1));
		  		ratings++; 
		  	}

		  	$scope.allMatchups[matchType][index].userScore = Number(userScore.toFixed(2)); // work out how to get mutliple scopes working
		  	$scope.allMatchups[matchType][index].ratings = ratings;
		  	$scope.allMatchups[matchType][index].overallScore = Number(($scope.allMatchups[matchType][index].userScore + $scope.allMatchups[matchType][index].statScore).toFixed(2));

		  };

		  $scope.addRating = function(rating, matchupKey, champKey, role, matchType, primaryRole){
		  	var currentData = findRating();
		  	var ascending = sortData(matchupKey, champKey);
		  	role = determineRatingRole(matchType, role);
		  	var roles = [];
		  	var newRating = [];

		  	if((matchType === 'synergy' || matchType === 'adcsupport')){
		  		if(ascending[0] === matchupData.championList[champKey].id){
		  			roles = (primaryRole === 'DUO_CARRY' || ($scope.champion && $scope.champion.role === 'DUO_CARRY')) ? ['DUO_CARRY','DUO_SUPPORT']:['DUO_SUPPORT','DUO_CARRY'];
	  			} else {
	  				roles = (primaryRole === 'DUO_CARRY' || ($scope.champion && $scope.champion.role === 'DUO_CARRY')) ? ['DUO_SUPPORT','DUO_CARRY']:['DUO_CARRY','DUO_SUPPORT'];
	  			
	  			}
		  	} else {
		  		roles = [primaryRole || $scope.champion.role, primaryRole || $scope.champion.role];
		  	}

		  	if(matchType === 'synergy'){
		  		newRating = [rating, rating];
		  	} else {
		  		newRating = (ascending[0] === matchupData.championList[champKey].id) ? [rating, 5-rating+1] : [5-rating+1, rating];
		  	}

		  	var newData = {
		  		champs : ascending,
		  		role : role,
		  		rating : newRating
		   	};
		  	var newUserScore, ratings, previousRating;

		  	if(currentData && currentData.length){
		  		var matchFound = false;
		  		for(var i = 0;i<currentData.length;i++){
		  			if(currentData[i].champs[0] === ascending[0] && currentData[i].champs[1] === ascending[1] && currentData[i].role === role){
		  				
		  				previousRating = ascending[0] === matchupData.championList[matchupKey].id ? currentData[i].rating[1]:currentData[i].rating[0];
		  				currentData[i] = newData;
		  				matchFound = true;
		  			}
		  		}
		  		if(!matchFound){
		  			currentData.push(newData);
		  		}
		  	} else {
		  		currentData = [];
		  		currentData.push(newData);
		  	}
		  	if(previousRating !== rating){
		  		if(!primaryRole){
		  			var updateClientObj = {matchupKey:matchupKey, rating:rating, matchType:matchType, previousRating:previousRating}
		  		}
		  		saveRating(currentData, newData, roles, updateClientObj); // add function to send to server
		  	}
		  };

		  $scope.displayRating = function(matchupKey, champKey, role, matchType){
		  	var currentData = findRating();
		  	role = determineRatingRole(matchType, role);
		  	var ascending = sortData(matchupKey, champKey);
		  	if(currentData && currentData.length){
				for(var i = 0;i<currentData.length;i++){
					if(currentData[i].champs[0] === ascending[0] && currentData[i].champs[1] === ascending[1] && currentData[i].role === role){
						return (ascending[0] === matchupData.championList[champKey].id) ? currentData[i].rating[0] : currentData[i].rating[1];
					}
				}
			}	
		  };
		}]);

	})(angular, matchupData);