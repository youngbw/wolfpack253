// public/js/appRoutes.js


	angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		$routeProvider

			//home page
			.when('/', {
				templateUrl: '/partials/home.jade',
				controller: 'HomeController',
				activetab: 'home'
			})

			.when('/guilds', {
				templateUrl: '/partials/guilds.jade',
				controller: 'GuildsController',
				activetab: 'guilds'
			})

			.when('/chats', {
				templateUrl: '/partials/chats.jade',
				controller: 'ChatsController',
				activetab: 'chats'
			})

			.when('/events', {
				templateUrl: '/partials/events.jade',
				controller: 'EventsController',
				activetab: 'events'
			})

			.when('/albums', {
				templateUrl: '/partials/albums.jade',
				controller: 'AlbumsController',
				activetab: 'albums'
			})


			// // nerds page that will use the nerd controller
			// .when('/nerds', {
			// 	templateUrl: 'views/nerd.html',
			// 	controller: 'NerdController'
			// });

		$locationProvider.html5Mode({ enabled: true, baseLocation: false});

	}]);
