// angular.module('app', ['ui.router', 'ngRoute', 'ngAnimate', 'angularMoment', 'ngDialog', 'ngcookieStore']);
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
// angular.module('app').run(function($rootScope, $location, $cookieStore, $http) {
//     // keep user logged in after page refresh
//         $rootScope.globals = $cookieStore.get('globals') || {};
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

angular.module('app', ['ui.router', 'ngRoute', 'ngAnimate', 'angularMoment', 'ngDialog', 'ngCookies'])
    // .config(config)
    // .run(run);

// config.$inject = ['$routeProvider', '$locationProvider'];
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'gateway/login.jade'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'gateway/register.jade'
        });

        // .otherwise({ redirectTo: '/login' });
})

// run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
.run(function($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/', '/login', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
});
