
app.directive('featureInfo', function() {

    return {
        restrict: 'E',
        scope: {info: '='},
        templateUrl: 'views/directives/featureInfo.jade'
    };

});
