angular.module('app')
    .controller('GatewayController', function($scope, AuthenticationService) {


        $scope.logout = function() {
            AuthenticationService.ClearCredentials();
        };




    });
