// public/js/appRoutes.js


	angular.module('appRoutes', []).config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

		$stateProvider.state('home', {
			url: '/',
			templateUrl: '/partials/home.jade',
			controller: 'HomeController',
			activetab: 'home'
		}).state('guilds', {
			url: '/guilds',
			templateUrl: '/partials/guilds.jade',
			controller: 'GuildsController',
			activetab: 'guilds'
		}).state('chats', {
			url: '/chats',
			templateUrl: '/partials/chats.jade',
			controller: 'ChatsController',
			activetab: 'chats'
		}).state('events', {
			url: '/events',
			templateUrl: '/partials/events.jade',
			controller: 'EventsController',
			activetab: 'events'
		}).state('albums', {
			url: '/albums',
			templateUrl: '/partials/albums.jade',
			controller: 'AlbumsController',
			activetab: 'albums'
		});

		$locationProvider.html5Mode({ enabled: true, baseLocation: false});
	}]);
