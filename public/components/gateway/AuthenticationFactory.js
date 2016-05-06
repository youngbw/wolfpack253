angular.module('app')
    .factory('AuthenticationService', function($http, $cookieStore, $rootScope, $timeout, UserService, BaseEncode, $location) {
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
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            console.log(expireDate);
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals, {expires: expireDate});
            $location.path('/home');
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
            $location.path('/login');
        }
});
