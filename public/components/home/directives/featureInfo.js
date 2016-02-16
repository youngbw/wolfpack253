angular.module('wolfpackApp').directive('featureInfo', function() {
    return {
        restrict: 'E',
        scope: {item: '='},
        templateUrl: '/home/directives/featureInfo.jade',
        controller: 'HomeController'
    };
});
