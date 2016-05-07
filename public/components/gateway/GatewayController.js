angular.module('app')
    .controller('GatewayController', function($scope, AuthenticationService) {


        $scope.logout = function() {
            console.log("logout");
            AuthenticationService.ClearCredentials();
        };




    });
