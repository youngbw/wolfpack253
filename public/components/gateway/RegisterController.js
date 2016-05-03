angular.module('app').controller('RegisterController', function($scope, AuthContentFactory, $location, $rootScope, $cookies) {
    $scope.title = 'Register here is a title';

    function registerUser(username, password, adminPassword) {
        var isAdmin = false;
        var user = {
            username: username,
            password: password
        };

        if (adminPassword !== undefined) {
            isAdmin = checkAdmin(adminPassword);
        }

        user.admin = isAdmin;

        AuthContentFactory.register(user)
            .then(function(result) {
                console.log(result);
                $location.path('/home');

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
