(function(angular, matchupData, sortData, radarChartSettings, lineChartSettings) {

    var appMatchup = angular.module('matchupPage', ['tc.chartjs', 'dirDisqus', 'core']);

    appMatchup.controller('matchupGraphs', ['$scope', function($scope) {
        $scope.champComparison = {
            data: {
                labels: matchupData.championMatrix.labels,
                datasets: [{
                    label: matchupData.champ1.name,
                    fillColor: "rgba(101, 228, 245, 0.65)",
                    strokeColor: "rgba(101, 228, 245, 1)",
                    pointColor: "rgba(101, 228, 245, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(101, 228, 245, 1)",
                    data: matchupData.championMatrix.champ1
                }, {
                    label: matchupData.champ2.name,
                    fillColor: "rgba(255, 83, 83, 0.55)",
                    strokeColor: "rgba(255, 83, 83, 0.99)",
                    pointColor: "rgba(255, 83, 83, 0.99)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(255, 83, 83, 0.99)",
                    data: matchupData.championMatrix.champ2
                }]
            },
            settings: radarChartSettings
        };

        $scope.goldIncome = {
            data: {
                labels: ["0-10", "10-20", "20-30", "30+"],
                datasets: [{
                    label: "champ1",
                    fillColor: "rgba(101, 228, 245, 0.65)",
                    strokeColor: "rgba(101, 228, 245, 1)",
                    pointColor: "rgba(101, 228, 245, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(101, 228, 245, 1)",
                    data: matchupData.goldLength.champ1
                }, {
                    label: "champ2",
                    fillColor: "rgba(255, 83, 83, 0.55)",
                    strokeColor: "rgba(255, 83, 83, 0.99)",
                    pointColor: "rgba(255, 83, 83, 0.99)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(255, 83, 83, 0.99)",
                    data: matchupData.goldLength.champ2
                }]
            },
            settings: lineChartSettings
        };
    }]);
})(angular, matchupData, sortData, radarChartSettings, lineChartSettings);