angular.module('app').controller('RegisterController', function($scope, AuthenticationService, $location, $rootScope, $cookies, UserService, ErrorService) {
    $scope.title = 'Register here is a title';
    $scope.dataLoading = false;

    function registerUser(username, password) {
        ErrorService.clearError();
        $scope.dataLoading = true;
        var user = {
            username: username,
            password: password
        };

        UserService.Create(user).success(function(result) {
            AuthenticationService.SetCredentials(username, password, true);
            var checked = document.getElementById('adminCheckbox').checked;
            if (checked) {
                UserService.requestAdmin(username).success(function(result2) {
                    $location.path('/home');
                }).error(function(err) {
                    ErrorService.moveToError(err.details);
                });
            }
        }).error(function(result) {
            ErrorService.moveToError(result.details);
        });


    };

    $scope.attemptRegister = function() {
        var username = $('#username').val();
        var pw = $('#password').val();

        registerUser(username, pw);
    };

});
