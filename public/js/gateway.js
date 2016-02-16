var app = angular.module('gateway', ['ui.router']).config([
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
