angular.module('app')
    .factory('AuthenticationService', function($http, $cookieStore, $rootScope, $timeout, UserService, BaseEncode, $location) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            UserService.GetByUsername(username)
               .success(function (response) {
                   callback(response);
               });

        }

        function SetCredentials(username, password, isRedirect) {

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
            if (isRedirect) {
                $location.path('/home');
            }

        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
            $location.path('/login');
        }
});
