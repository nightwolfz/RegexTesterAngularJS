function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};

/*
@TODO: Add debouncer to eliminate repetitive events from regex/testString changes
 */

var regexApp = angular.module('regexApp', []);

regexApp.controller('RegexController', function ($scope) {

    $scope.regexes = {
        prefix: "(Tod.*) (da.*)",
        suffix: "g",
        testString: "Today's date is: 5/20/2014."
    };

    $scope.doRegex = function() {
        var regex = new RegExp($scope.regexes.prefix, $scope.regexes.suffix);
        var matches = regex.exec($scope.regexes.testString)

        var results = [];
        angular.forEach(matches, function(value, key){
            results.push(value);
        });
        $scope.matchResult = results;
    };

    $scope.$watch("regexes.prefix", $scope.doRegex);
    $scope.$watch("regexes.suffix", $scope.doRegex);
    $scope.$watch("regexes.testString", $scope.doRegex);
});