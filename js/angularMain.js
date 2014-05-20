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