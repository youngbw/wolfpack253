angular.module('app').controller('RegisterController', function($scope, AuthenticationService, $location, $rootScope, $cookies, UserService) {
    $scope.title = 'Register here is a title';
    $scope.dataLoading = false;

    function registerUser(username, password, adminPassword) {
        $scope.dataLoading = true;
        var isAdmin = false;
        var user = {
            username: username,
            password: password
        };

        if (adminPassword !== undefined) {
            isAdmin = checkAdmin(adminPassword);
        }

        user.admin = isAdmin;

        UserService.Create(user)
            .then(function (response) {
                console.log(response);
                if (response.data.success) {
                    AuthenticationService.SetCredentials(username, password);

                    $location.path('/home');
                } else {
                    console.log(response.message);
                    $scope.dataLoading = false;
                }
            });
    };

    function checkAdmin(pw) {
        return true;
    }

    $scope.attemptRegister = function() {
        var username = $('#username').val();
        var pw = $('#password').val();

        registerUser(username, pw, 1);
    };

});
