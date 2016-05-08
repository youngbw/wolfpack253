angular.module('app')
    .directive('errorAlert', function(ErrorService) {

        return {

            restrict: 'EA',
            templateUrl: '/shared/directives/error.jade',
            scope: {},
            link: function(scope) {
                scope.showError = false;
                scope.errorMessage = '';
                ErrorService.moveToError = function(msg) { // call this method like ErrorService.moveToError(msg) from other controllers to invoke an error div
                    scope.showError = true;
                    scope.errorMessage = msg;

                };

                ErrorService.clearError = function() { // This will remove the error div from the screen
                    scope.showError = false;
                    var timer;
            		timer && clearTimeout(timer);
                    timer = setTimeout(function()
                    {
                        scope.errorMessage = '';
                    },
                    1000);
                }

                scope.clear = function() {
                    ErrorService.clearError();
                };
            }


        };

    });
