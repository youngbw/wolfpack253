angular.module('app').controller('LoginController', function($scope, $location, AuthenticationService, ErrorService) {
    $scope.title = 'Login here is a title';
    $scope.dataLoading = false;

    $scope.login = function() {
        ErrorService.clearError();
        $scope.dataLoading = true;
        var username = $('#username').val();
        var password = $('#password').val();
        AuthenticationService.Login(username, password, function (response) {
            console.log(response);
            if (response.success) {
                if (response.details === null) {
                    ErrorService.moveToError('That username does not exist.');
                }
                if (response.details.password === password) {
                    AuthenticationService.SetCredentials(response.details.username, response.details.password, true);
                    $location.path('/home');
                } else {
                    ErrorService.moveToError('Incorrect Password.')
                }

            } else {
                ErrorService.moveToError('Something went wrong!');
                $scope.dataLoading = false;
            }
        });
    };

    function init() {
        AuthenticationService.ClearCredentials();
    }
    init();

});
