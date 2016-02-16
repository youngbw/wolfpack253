angular.module('gateway').config([
    '$stateProvider',
    function($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/partials/login',
        controller: 'AuthController'
    }).state('register', {
        url: '/register',
        templateUrl: '/partials/register',
        controller: 'AuthController'
    });
    $urlRouterProvider.otherwise('login');
}]);
