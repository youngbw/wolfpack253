// public/js/appRoutes.js


	angular.module('appRoutes', []).config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

		$stateProvider.state('home', {
			url: '/',
			templateUrl: '/partials/home.jade',
			controller: 'HomeController'
		}).state('guilds', {
			url: '/guilds',
			templateUrl: '/partials/guilds.jade',
			controller: 'GuildsController',
		}).state('chats', {
			url: '/chats',
			templateUrl: '/partials/chats.jade',
			controller: 'ChatsController'
		}).state('events', {
			url: '/events',
			templateUrl: '/partials/events.jade',
			controller: 'EventsController'
		}).state('albums', {
			url: '/albums',
			templateUrl: '/partials/albums.jade',
			controller: 'AlbumsController',
		});

		$locationProvider.html5Mode({ enabled: true, baseLocation: false});
	}]);
