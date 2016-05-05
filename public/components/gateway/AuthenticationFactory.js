angular.module('app')
    .factory('AuthenticationService', function($http, $cookies, $rootScope, $timeout, UserService, BaseEncode, $location) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            // $timeout(function () {
            //     var response;
            //     UserService.GetByUsername(username)
            //         .then(function (user) {
            //             if (user !== null && user.password === password) {
            //                 response = { success: true };
            //             } else {
            //                 response = { success: false, message: 'Username or password is incorrect' };
            //             }
            //             callback(response);
            //         });
            // }, 1000);

            /* Use this for real authentication
             ----------------------------------------------*/
            UserService.GetByUsername(username)
               .success(function (response) {
                   callback(response);
               });

        }

        function SetCredentials(username, password) {

            var authdata = BaseEncode.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookies.put('globals', $rootScope.globals);
            $location.path('/home');
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
            $location.path('/login');
        }
});
