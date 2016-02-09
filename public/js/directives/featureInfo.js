
app.directive('featureinfo', function() {

    return {
        restrict: 'E',
        scope: {item: '='},
        templateUrl: 'views/directives/featureinfo.jade'
    };

});
