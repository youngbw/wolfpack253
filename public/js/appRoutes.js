// public/js/appRoutes.js


	angular.module('appRoutes', []).config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

		$stateProvider.state('default', {
			url: '/',
			templateUrl: 'home/home.jade',
			controller: 'HomeController'
		}).state('home', {
			url: '/home',
			templateUrl: 'home/home.jade',
			controller: 'HomeController'
		}).state('guilds', {
			url: '/guilds',
			templateUrl: 'guilds/guilds.jade',
			controller: 'GuildsController'
		}).state('chats', {
			url: '/chats',
			templateUrl: 'chats/chats.jade',
			controller: 'ChatsController'
		}).state('events', {
			url: '/events',
			templateUrl: 'events/events.jade',
			controller: 'EventsController'
		}).state('albums', {
			url: '/albums',
			templateUrl: 'albums/albums.jade',
			controller: 'AlbumsController'
		});

		$locationProvider.html5Mode({ enabled: true, baseLocation: false});
	}]);
