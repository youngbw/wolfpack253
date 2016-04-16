angular.module('wolfpackApp').directive('featureInfo', function($location) {
    return {
        restrict: 'E',
        scope: {item: '='},
        templateUrl: '/home/directives/featureInfo.jade',
        link: {
            post: function(scope) {
                scope.go = function(hash) {
                    $location.path( hash );
                };

                scope.mouseEntered = function(event) {
                    $(event.currentTarget).css({
                        'border': '2px solid #94BA65'
                    });
                };

                scope.mouseExited = function(event) {
                    $(event.currentTarget).css({
                        'border': '2px solid black'
                    });
                };
            }
        }
    };
});
