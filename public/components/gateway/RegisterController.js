angular.module('app').controller('RegisterController', function($scope, AuthContentFactory, $location, $rootScope) {
    $scope.title = 'Register here is a title';

    $scope.registerUser = function(username, password, adminPassword) {
        var isAdmin = false;
        var user = {
            name: username,
            password: password
        };

        if (adminPassword !== undefined) {
            isAdmin = checkAdmin(adminPassword);
        }

        user.admin = isAdmin;

        AuthContentFactory.register(user)
            .then(function(result) {
                console.log(result);
            });

    };

    function checkAdmin(pw) {
        return true;
    }

});
