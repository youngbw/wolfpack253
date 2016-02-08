// public/js/appRoutes.js


	angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		$routeProvider

			//home page
			.when('/', {
				templateUrl: '/partials/home.jade',
				controller: 'HomeController'
			});


			// // nerds page that will use the nerd controller
			// .when('/nerds', {
			// 	templateUrl: 'views/nerd.html',
			// 	controller: 'NerdController'
			// });

		$locationProvider.html5Mode({ enabled: true, baseLocation: false});

	}]);
