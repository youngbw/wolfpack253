angular.module('app').controller('LoginController', function($scope, $location, AuthenticationService) {
    $scope.title = 'Login here is a title';
    $scope.dataLoading = false;

    $scope.login = function() {
            $scope.dataLoading = true;
            var username = $('#username').val();
            var password = $('#password').val();
            AuthenticationService.Login(username, password, function (response) {
                console.log(response);
                if (response.success) {

                    AuthenticationService.SetCredentials(response.details.username, response.details.password, true);
                    $location.path('/home');
                } else {
                    console.log(response.message);
                    $scope.dataLoading = false;
                }
            });
        };

    function init() {
        AuthenticationService.ClearCredentials();
    }
    init();

});
