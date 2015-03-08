var sortData = function(champ1, champ2, position) {
    champ1 = matchupData.championList[champ1].id;
    champ2 = matchupData.championList[champ2].id;
    return (champ1 < champ2) ? [champ1, champ2] : [champ2, champ1];
};


(function(angular, matchupData) {

    var appCore = angular.module('core', ['ui.bootstrap']);

     appCore.filter('to_trusted', ['$sce', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
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

        $scope.determineSend = function(keyCode) {
            if (keyCode === 13) {
                window.location.assign('/champion/' + $scope.selected.key);
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

    appCore.factory('ToolTip', function($window){
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
                    masteries: "<div ng-if=\"tooltipContent\"><h4>{{tooltipContent.name}}</h4>"
                                + "<div class=\"description\" ng-repeat=\"tip in tooltipContent.description\">"
                                + "{{grahh}}<div ng-class=\"{'highlight' : $index == apiSecondaryId}\" ng-bind-html=\"tip | to_trusted\">"
                                + "</div></div></div>"
                }
                var end = "<div ng-if=\"!tooltipContent\">Loading...</div>"+
                        "</div><div class='arrow-down'></div>";
                return beginning + obj[tAttrs.apiType] + end;
            }
        };
    })
    

    appCore.directive('toolContainer', function(ToolTip, $timeout, $http){
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
                    }, 1)
                }, true);

                $http.get('http://localhost/static/'+scope.apiType+'/'+scope.apiPrimaryId).success(function(data, status, headers, config){
                    scope.tooltipContent = data; 
                }).error(function(data,status,headers,config){
                    console.log(data);
                });
                 
            }
        }
    });

    appCore.directive('championTip', function($compile, $timeout){
        return {
            restrict: "A", 
            scope:{
                apiType: "@",
                apiPrimaryId: "@",
                apiSecondaryId: "@"
            },
            controller: function($scope){
                $scope.positionInfo = {};
            },
            link: function(scope, elem, attr){
                var elemCopy = elem;
                var timed = [];
                mouseenterFunction = function(){
                    timed[timed.length] = $timeout(function(){
                        scope.positionInfo = this.getBoundingClientRect();                    
                        var currentToolTip = "<tool-container api-type="+scope.apiType+" api-primary-id="+scope.apiPrimaryId+" api-secondary-id="+(scope.apiSecondaryId || 'none')+" position='positionInfo' class='currentTooltip'></tool-container>"
                        var tool = $compile(currentToolTip)(scope);
                        angular.element(document.getElementsByTagName('body')[0]).prepend(tool);
                    }.bind(this), 120);
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
        }
    });

})(angular, matchupData);