
app.directive('featureInfo', function() {
    return {
        restrict: 'E',
        scope: {item: '='},
        templateUrl: '/home/directives/featureInfo.jade'
    };

});
