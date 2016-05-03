angular.module('app').factory('AuthContentFactory', ['$http', '$window', function($http, $window, $cookies){

    // var getPayload = function(token) {
    //     return JSON.parse($window.atob(token.split('.')[1]));
    // };

    var auth = {};

    // auth.saveToken = function (token){
    //     $window.localStorage['wolfpack-token'] = token;
    // };
    //
    // auth.getToken = function (){
    //     return $window.localStorage['wolfpack-token'];
    // };
    //
    // auth.isLoggedIn = function(){
    //     var token = auth.getToken();
    //     if(token) {
    //         var payload = getPayload(token);
    //         return payload.exp > Date.now() / 1000;
    //     } else {
    //         return false;
    //     }
    // };

    // auth.currentUser = function(){
    //     if(auth.isLoggedIn()) {
    //         var token = auth.getToken();
    //         var payload = getPayload(token);
    //
    //         return payload.username;
    //     }
    // };

    auth.register = function(user){
        return $http.post('/api/register', user);

        // .success(function(data){
        //     if (!data) { console.log('No response data'); }
        //
        //     auth.saveToken(data.token);
        // });
    };

    auth.logIn = function(user){
        return $http.post('/api/login', user);
        // .success(function(data){
        //     auth.saveToken(data.token);
        // });
    };

    auth.logOut = function(){
        // $window.localStorage.removeItem('wolfpack-token');
        $rootScope.globals = {};
        $cookies.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic';
    };

    return auth;
}]);
