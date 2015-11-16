// angular
(function(angular, matchupData) {

    var statsApp = angular.module('statsPage', ['core']);

    statsApp.controller('data', ['$scope', '$location', function($scope, $location) {
        var urlParams = $location.search();
        $scope.championData = matchupData.stats;

        $scope.search = {
            title: urlParams.search || ''
        };

        $scope.roleSort = {
            role: urlParams.roleSort || ''
        };

        $scope.Math = Math;

        $scope.indexNumber = function(index, dataLength){
            var reverseList = false;
            if($scope.sortExpression.sortBy === 'role' || $scope.sortExpression.sortBy === 'title' || $scope.sortExpression.sortBy === 'general.overallPosition'){
                reverseList = true;
            }

            if((!reverseList && $scope.order === '-') || (reverseList && $scope.order === '')){
                return index + 1;
            } else {
                return dataLength - index;
            }
        };

        $scope.searchUrl = function() {
            $location.search('search', $scope.search.title);
        };

        $scope.chosenRole = function() {
            $location.search('roleSort', $scope.roleSort.role);
        };

        $scope.changeOrder = function(){
            $scope.order = ($scope.order === '-') ? '' : '-';
            $location.search('order', ($scope.order === '-') ? 'descend' : 'ascend');
        };

        $scope.changeSelection = function(property) {
            if (property !== 'role' && property !== 'title') {
                property = 'general.' + property;
            }
            if ($scope.sortExpression.sortBy === property) {
                $scope.order = ($scope.order === '-') ? '' : '-';
            } else {
                $scope.sortExpression.lastSortBy = $scope.sortExpression.sortBy;
                $scope.sortExpression.sortBy = property;
                if ((($scope.sortExpression.lastSortBy === 'role' || $scope.sortExpression.lastSortBy === 'title' || $scope.sortExpression.lastSortBy === 'general.overallPosition') && property !== 'role' && property !== 'title' && property !== 'general.overallPosition') || (($scope.sortExpression.lastSortBy !== 'role' || $scope.sortExpression.lastSortBy !== 'title' || $scope.sortExpression.lastSortBy !== 'general.overallPosition') && (property === 'role' || property === 'title' || property === 'general.overallPosition'))) {
                    $scope.order = ($scope.order === '-') ? '' : '-';
                }
            }
            $location.search('sortBy', $scope.sortExpression.sortBy);
            $location.search('order', ($scope.order === '-') ? 'descend' : 'ascend');
        };
        $scope.determineSelected = function(property) {
            var propName = $scope.sortExpression.sortBy.split('.').reverse()[0];
            if (property === propName) {
                return true;
            }
        };

        $scope.determineOrder = function(direction) {
            if (direction === 'down') {
                if ($scope.sortExpression.sortBy === 'role' || $scope.sortExpression.sortBy === 'title' || $scope.sortExpression.sortBy === 'general.overallPosition') {
                    return $scope.order !== '';
                }
                return $scope.order === '';
            }

            if ($scope.sortExpression.sortBy === 'role' || $scope.sortExpression.sortBy === 'title' || $scope.sortExpression.sortBy === 'general.overallPosition') {
                return $scope.order === '';
            }
            return $scope.order !== '';
        };

        $scope.sortExpression = {
            sortBy: urlParams.sortBy || 'title',
            lastSortBy: 'role'
        };
        $scope.order = '';
        if (urlParams.order === 'descend') {
            $scope.order = '-';
        }

    }]);
})(angular, matchupData);