// angular.module('app', ['ui.router', 'ngRoute', 'ngAnimate', 'angularMoment', 'ngDialog', 'ngCookies']);
//
//
// angular.module('app').config(function (ngDialogProvider, $locationProvider, $routeProvider) {
//     ngDialogProvider.setOpenOnePerName(true);
//
//     $routeProvider
//             // .when('/', {
//             //     controller: 'LoginController',
//             //     templateUrl: 'gateway/login.jade'
//             // })
//
//             .when('/login', {
//                 controller: 'LoginController',
//                 templateUrl: 'gateway/login.jade'
//             })
//
//             .when('/register', {
//                 controller: 'RegisterController',
//                 templateUrl: 'gateway/register.jade'
//             })
//
//             .otherwise({ redirectTo: '/login' });
//
//
// });
//
// angular.module('app').run(function($rootScope, $location, $cookies, $http) {
//     // keep user logged in after page refresh
//         $rootScope.globals = $cookies.get('globals') || {};
//         if ($rootScope.globals.currentUser) {
//             $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//         }
//
//         $rootScope.$on('$locationChangeStart', function (event, next, current) {
//             // redirect to login page if not logged in and trying to access a restricted page
//             var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
//             var loggedIn = $rootScope.globals.currentUser;
//             if (restrictedPage && !loggedIn) {
//                 $location.path('/login');
//             }
//         });
// });

(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngRoute', 'ngAnimate', 'angularMoment', 'ngDialog', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            // .when('/', {
            //     controller: 'HomeController',
            //     templateUrl: 'home/home.jade',
            //     controllerAs: 'vm'
            // })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'gateway/login.jade',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'gateway/register.jade',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();
