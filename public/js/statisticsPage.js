(function(angular, matchupData){

   var statsApp = angular.module('statsPage', ['core']);
   statsApp.controller('data', ['$scope', function($scope){
    $scope.championData = matchupData.stats;
    $scope.search = {
      title:''
    };

    $scope.Math = Math;

    $scope.changeSelection = function(property){
      if(property !== 'role' && property !== 'title'){
        property = 'general.'+property;
      }
      if($scope.sortExpression.sortBy===property){
        $scope.order = ($scope.order==='-')?'':'-';
      } else {
        $scope.sortExpression.lastSortBy = $scope.sortExpression.sortBy;
        $scope.sortExpression.sortBy = property;
      }
      
    };
    $scope.determineSelected = function(property){
      var propName = $scope.sortExpression.sortBy.split('.').reverse()[0];
      if(property === propName){
        return true;
      }
    };

    $scope.determineOrder = function(direction){
      if(direction === 'down'){
        if($scope.sortExpression.sortBy === 'role' || $scope.sortExpression.sortBy === 'title' ||  $scope.sortExpression.sortBy === 'general.overallPosition'){
          return $scope.order === '' ? false : true;
        }
        return $scope.order === '' ? true : false;
      }

      if($scope.sortExpression.sortBy === 'role' || $scope.sortExpression.sortBy === 'title' ||  $scope.sortExpression.sortBy === 'general.overallPosition'){
          return $scope.order === '' ? true : false;
      }
      return $scope.order === '' ? false : true;
    };

    $scope.sortExpression ={
      sortBy: 'title',
      lastSortBy: 'role'
    };
    $scope.order = '';

   }]);
})(angular, matchupData);  
