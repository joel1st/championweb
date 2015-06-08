(function(angular, matchupData, sortData, radarChartSettings, lineChartSettings) {

    var appChampion = angular.module('championPage', ['tc.chartjs', 'dirDisqus', 'core', 'ui.bootstrap']);

    appChampion.factory('processNewData', function() {
        return function(data, type) {
            if (data instanceof Array) {
                for (var i = 0; i < data.length; i++) {
                    data[i].name = matchupData.championList[data[i].key].name;
                }
            }
            return data;
        };
    });

    appChampion.controller('generalChampion', ['$scope', function($scope) {
        $scope.champion = matchupData.champion;
        $scope.Math = window.Math;
        $scope.currentDiscussion = '';
        $scope.currentSide = '';
    }]);

    appChampion.controller('championData', ['$scope', function($scope) {
        $scope.generalData = matchupData.championData.general;
        $scope.overallPlacement = matchupData.championData.overallPlacement;
        $scope.generalRole = matchupData.generalRole;
        $scope.championMatrix = matchupData.championData.championMatrix;
        $scope.gameLengthData = matchupData.championData.gameLength;
        $scope.experienceRate = matchupData.championData.experienceRate;
        $scope.experienceSample = matchupData.championData.experienceSample;
        $scope.patchWinData = matchupData.championData.patchWin;
        $scope.patchPlayData = matchupData.championData.patchPlay;
        $scope.summoners = matchupData.championData.summoners;
        $scope.items = matchupData.championData.items;

        var createArray = function(total) {
            var arr = [];
            for (var i = 0; i < total; i++) {
                arr.push(100);
            }
            return arr;
        };
        // First graph
        $scope.overallComparison = {
            data: {
                labels: $scope.generalRole.matrixLabels,
                datasets: [{
                    label: $scope.champion.name,
                    fillColor: "rgba(137,245,162,0.7)",
                    strokeColor: "#89f5a2",
                    pointColor: "#89f5a2",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#89f5a2",
                    data: $scope.championMatrix
                }, {
                    label: "Average of " + $scope.champion.roleTitle + " Champs",
                    fillColor: "rgba(220,220,220,0.3)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: createArray($scope.generalRole.matrixLabels.length)

                }

                ]
            },
            settings: radarChartSettings

        };

        $scope.experienceRate = {
            data: {
                labels: ["1-5", "5-15", "15-50", "50-125", "125+"],
                datasets: [{
                    label: $scope.champion.name + " Experience",
                    fillColor: "rgba(137,245,162,0.6)",
                    strokeColor: "#89f5a2",
                    pointColor: "#89f5a2",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#89f5a2",
                    data: $scope.experienceRate
                }, {
                    label: $scope.champion.name + " Overall",
                    fillColor: "rgba(220,220,220,0.3)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [$scope.generalData[0].val, $scope.generalData[0].val, $scope.generalData[0].val, $scope.generalData[0].val, $scope.generalData[0].val]
                }]
            },
            settings: lineChartSettings
        };

        $scope.experienceDistribution = {
            data: {
                datasets: [{
                    value: $scope.experienceSample[0],
                    color:'#65e4f5',
                    highlight: '#55ebff',
                    label: '1-5'
                },{
                    value: $scope.experienceSample[1],
                    color:'#88f4a1',
                    highlight: '#81ff9e',
                    label: '5-15'
                }, {
                    value: $scope.experienceSample[2],
                    color:'#fff06d',
                    highlight: '#ffed56',
                    label: '15-50'
                },
                {
                    value: $scope.experienceSample[3],
                    color: '#ffa94d',
                    highlight: '#ff9e37',
                    label: '50-125'
                },
                {
                    value: $scope.experienceSample[4],
                    color: '#ff5353',
                    highlight: '#ff4242',
                    label: '125+'
                }]
            },
            settings: pieChartSettings
        };

        $scope.gameLength = {
            data: {
                labels: ["0-25", "25-30", "30-35", "35-40", "40+"],
                datasets: [{
                    label: $scope.champion.name,
                    fillColor: "rgba(137,245,162,0.6)",
                    strokeColor: "#89f5a2",
                    pointColor: "#89f5a2",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#89f5a2",
                    data: $scope.gameLengthData
                }, {
                    label: "Average of " + $scope.champion.roleTitle + " Champs",
                    fillColor: "rgba(220,220,220,0.3)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [50, 50, 50, 50, 50]
                }]
            },
            settings: lineChartSettings
        };

        $scope.patchRate = {
            data: {
                labels: matchupData.patchHistory,
                datasets: [{
                    label: $scope.champion.name,
                    fillColor: "rgba(137,245,162,0.6)",
                    strokeColor: "#89f5a2",
                    pointColor: "#89f5a2",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#89f5a2",
                    data: $scope.patchWinData
                }, {
                    label: "Average of " + $scope.champion.roleTitle + " Champs",
                    fillColor: "rgba(220,220,220,0.3)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [50, 50, 50, 50, 50]
                }]
            },
            settings: lineChartSettings
        };

        $scope.patchPlay = {
            data: {
                labels: matchupData.patchHistory,
                datasets: [{
                    label: $scope.champion.name,
                    fillColor: "rgba(137,245,162,0.6)",
                    strokeColor: "#89f5a2",
                    pointColor: "#89f5a2",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#89f5a2",
                    data: $scope.patchPlayData
                }, {
                    label: "Average of " + $scope.champion.roleTitle + " Champs",
                    fillColor: "rgba(220,220,220,0.3)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: $scope.generalRole.patchPlay
                }]
            },
            settings: lineChartSettings
        };

    }]);

    appChampion.directive('filters', function() {
        return {
            restrict: "E",
            templateUrl: "filters.html",
            scope: true,
            link: function(scope, elm, attrs) {
                scope.matchupType = attrs.matchupType;
            }
        };
    });

    appChampion.directive('matchups', function() {
        return {
            restrict: "E",
            templateUrl: "matchups.html",
            scope: true,
            link: function(scope, elm, attrs) {
                scope.order = attrs.order; //Get it from attributes
                scope.matchupType = attrs.matchupType;
            }
        };
    });

    appChampion.service('anchorSmoothScroll', function() {

        this.scrollTo = function(eID) {

            // This scrolling function 
            // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

            var startY = currentYPosition();
            var stopY = elmYPosition(eID) - 65; //to include stat area
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY);
                return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step;
                    if (leapY > stopY) leapY = stopY;
                    timer++;
                }
                return;
            }
            for (var d = startY; d > stopY; d -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step;
                if (leapY < stopY) leapY = stopY;
                timer++;
            }

            function currentYPosition() {
                console.log('wut, y are i running');
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                }
                return y;
            }

        };

    });

    appChampion.controller('matchupData', ['$scope', '$http', 'anchorSmoothScroll', 'processNewData', 'localStorageAccess', function($scope, $http, anchorSmoothScroll, processNewData, localStorageAccess) {

        $scope.allMatchups = {
            matchups: processNewData(matchupData.championData.matchups, 'matchups'),
            adcsupport: processNewData(matchupData.championData.adcsupport, 'adcsupport'),
            synergy: processNewData(matchupData.championData.synergy, 'synergy')
        };

        $scope.filtered = {

        };

        $scope.search = {
            matchups: {
                name: ''
            },
            adcsupport: {
                name: ''
            },
            synergy: {
                name: ''
            }
        };

        $scope.minGames = localStorageAccess.retrieve('minGames') || 100;

        $scope.matchAmount = function(item) {
            return item.games >= $scope.minGames;
        };

        //default sort
        var previousSort = localStorageAccess.retrieve('chosenSort');
        $scope.sortExpression = {
            sortBy: (previousSort === 'statScore' || previousSort === 'winRate') ? previousSort : 'statScore'
        };

        $scope.generateId = function(matchupType, matchupKey) {
            var arr = sortData(matchupKey, $scope.champion.key);
            return (matchupType === 'matchups') ? arr[0] + 'v' + arr[1] + $scope.champion.role : arr[0] + 'v' + arr[1] + (matchupType.toUpperCase());
        };

        $scope.matchupDiscussion = function(matchupType, matchupKey, funcType, matchupSide) {
            if (funcType === 'toggle') {
                $scope.currentSide = matchupSide;
                setTimeout(function() {
                    anchorSmoothScroll.scrollTo('disqus_thread');
                }, 100);
            }

            if ($scope.currentDiscussion === $scope.generateId(matchupType, matchupKey) && ($scope.currentSide === matchupSide)) {

                if (funcType === 'id') {

                    return 'disqus_thread';

                } else if (funcType === 'toggle') {
                    $scope.currentDiscussion = '';
                } else if (funcType === "bind") {
                    return true;
                }
            } else {
                if (funcType === 'id') {
                    return ' ';
                } else if (funcType === 'toggle') {
                    $scope.currentDiscussion = $scope.generateId(matchupType, matchupKey);
                } else if (funcType === "bind") {
                    return false;
                }
            }
        };

        $scope.saveMinGames = function() {
            localStorageAccess.save('minGames', $scope.minGames);
        };

        $scope.saveSort = function(type) {
            $scope.sortExpression.sortBy = type;
            localStorageAccess.save('chosenSort', $scope.sortExpression.sortBy);
        };

        //Show more buttons
        var numberShown = 5;
        var timesShown = {
            "matchups": 1,
            "matchups-": 1,
            "adcsupport": 1,
            "adcsupport-": 1,
            "synergy": 1,
            "synergy-": 1
        };

        $scope.matchupsCount = function(matchType) {
            return $scope.filtered[matchType].length;
        };

        $scope.itemsLimit = function(matchType, order) {
            return numberShown * timesShown[matchType + order];
        };

        $scope.hasMoreItemsToShow = function(matchType, order) {
            return timesShown[matchType + order] < ($scope.filtered[matchType].length / numberShown) && $scope.search[matchType].name.length === 0;
        };

        $scope.showMoreItems = function(matchType, order) {
            timesShown[matchType + order] ++;
        };

        // show stats
        // First graph

    }]);

    appChampion.controller('specificMatchup', ['$scope', '$http', function($scope, $http) {
        $scope.showMatchups = false;
        $scope.matchupRetrieved = false;
        $scope.showDiscussion = false;
        $scope.specificMatchupCharts = {
            championMatrix: {
                labels: [],
                champ1: [],
                champ2: []
            },
            goldLength: {
                champ1: [],
                champ2: []
            }
        };

        $scope.matchupId = matchupData.championList[$scope.matchup.key].id;
        $scope.championId = matchupData.championList[$scope.champion.key].id;

        $scope.generateChampUrl = function(matchupType) {
            if (matchupType === 'matchups') {
                return $scope.champion.roleTitle;
            }
            return ($scope.champion.roleTitle === 'Support') ? 'ADC' : 'Support';
        };


        $scope.toggleMatchup = function(matchupType, key) {
            $scope.showDiscussion = false;
            $scope.showMatchups = !$scope.showMatchups;
            $scope.getSpecificMatchup(matchupType, key);
        };

        $scope.generateMatchupUrl = function(key, matchupType) {
            var championKey = $scope.champion.key;
            var urlStart = '/matchup/';
            var urlMiddle = (matchupData.championList[key].id < matchupData.championList[championKey].id) ? key + '/' + championKey + '/' : championKey + '/' + key + '/';
            var urlEnd = (matchupType === 'matchups') ? $scope.champion.roleTitle : matchupType;

            return urlStart + urlMiddle + urlEnd;
        };


        $scope.champtype = function(key, first) {

            if ($scope.matchupId > $scope.championId && !first) {
                return 'champ2';
            } else if ($scope.matchupId < $scope.championId && !first) {
                return 'champ1';
            } else if ($scope.matchupId > $scope.championId && first) {
                return 'champ1';
            }
            return 'champ2';
        };

        $scope.getSpecificMatchup = function(matchupType, matchupKey) {
            var idOrder = sortData(matchupKey, $scope.champion.key);
            var role = (matchupType === 'matchups') ? $scope.champion.role : matchupType.toUpperCase();


            // add cacheing
            $http.get('/matchupJson/' + idOrder[0] + '/' + idOrder[1] + '/' + role).success(function(data) {
                console.log('retrieved');
                for (var i = 0; i < $scope.allMatchups[matchupType].length; i++) {
                    if ($scope.allMatchups[matchupType][i].key === matchupKey) {
                        $scope.allMatchups[matchupType][i].specificMatchup = data;

                        //manually update data for charts - sucks I know..
                        for (var t = 0; t < data.championMatrix.labels.length; t++) {
                            $scope.specificMatchupCharts.championMatrix.labels[t] = data.championMatrix.labels[t];
                            $scope.specificMatchupCharts.championMatrix.champ1[t] = data.championMatrix.champ1[t];
                            $scope.specificMatchupCharts.championMatrix.champ2[t] = data.championMatrix.champ2[t];
                        }

                        for (var y = 0; y < data.goldLength.champ1.length; y++) {
                            $scope.specificMatchupCharts.goldLength.champ1[y] = data.goldLength.champ1[y];
                            $scope.specificMatchupCharts.goldLength.champ2[y] = data.goldLength.champ2[y];
                        }


                        $scope.matchupRetrieved = true;
                    }
                }
            });
        };

        var determineChamp = function(index) {
            if ($scope.championId !== 0) {
                if (index === 0) {
                    return ($scope.championId < $scope.matchupId) ? 'champ1' : 'champ2';
                } else if (index === 1) {
                    return ($scope.championId < $scope.matchupId) ? 'champ2' : 'champ1';
                }
            }
        };

        $scope.champComparison = {
            data: {
                labels: $scope.specificMatchupCharts.championMatrix.labels,
                datasets: [

                    {
                        label: 'champ1',
                        fillColor: "rgba(255, 83, 83, 0.48)",
                        strokeColor: "rgba(255, 83, 83, 0.99)",
                        pointColor: "rgba(255, 83, 83, 0.99)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(255, 83, 83, 0.99)",
                        data: $scope.specificMatchupCharts.championMatrix[determineChamp(1)]
                    }, {
                        label: 'champ2',
                        fillColor: "rgba(101, 228, 245, 0.48)",
                        strokeColor: "rgba(101, 228, 245, 1)",
                        pointColor: "rgba(101, 228, 245, 1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(101, 228, 245, 1)",
                        data: $scope.specificMatchupCharts.championMatrix[determineChamp(0)]
                    }

                ]
            },
            settings: radarChartSettings
        };

        $scope.goldIncome = {
            data: {
                labels: ["0-10", "10-20", "20-30", "30+"],
                datasets: [{
                    label: "champ2",
                    fillColor: "rgba(255, 83, 83, 0.48)",
                    strokeColor: "rgba(255, 83, 83, 0.99)",
                    pointColor: "rgba(255, 83, 83, 0.99)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(255, 83, 83, 0.99)",
                    data: $scope.specificMatchupCharts.goldLength[determineChamp(1)]
                }, {
                    label: "champ1",
                    fillColor: "rgba(101, 228, 245, 0.48)",
                    strokeColor: "rgba(101, 228, 245, 1)",
                    pointColor: "rgba(101, 228, 245, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(101, 228, 245, 1)",
                    data: $scope.specificMatchupCharts.goldLength[determineChamp(0)]
                }]
            },
            settings: lineChartSettings
        };

    }]);

    var decodeEntities = (function() {
        // this prevents any overhead from creating the object each time
        var element = document.createElement('div');

        function decodeHTMLEntities(str) {
            if (str && typeof str === 'string') {
                // strip script/html tags
                str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
                str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
                element.innerHTML = str;
                str = element.textContent;
                element.textContent = '';
            }
            return str;
        }

        return decodeHTMLEntities;
    })();

    appChampion.controller('reddit', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.redditData = [];
        $scope.enoughUpvotes = function(thread) {
            return thread.data.score >= 2;
        };
        $timeout(function() {
            $http.get('http://api.reddit.com/r/summonerschool/search?q=' + $scope.champion.name + '&sort=relevance&restrict_sr=on&t=month').success(function(data) {
                $scope.redditData = data.data.children;
                for (var i = 0; i < $scope.redditData.length; i++) {
                    $scope.redditData[i].data.selftext_html = decodeEntities($scope.redditData[i].data.selftext_html);
                }
            });
        }, 1500);
    }]);

    appChampion.controller('redditThread', ['$scope', function($scope) {
        $scope.summaryVisible = false;
        $scope.toggleSummary = function() {
            $scope.summaryVisible = ($scope.summaryVisible) ? false : true;
        };
    }]);

})(angular, matchupData, sortData, radarChartSettings, lineChartSettings);