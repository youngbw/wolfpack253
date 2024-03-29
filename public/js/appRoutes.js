angular.module('app').config([
	'$stateProvider',
	'$locationProvider',
	 function($stateProvider, $locationProvider) {

	$stateProvider.state('login', {
			url: '/login',
			templateUrl: 'gateway/login.jade'
		}).state('register', {
			url: '/register',
			templateUrl: 'gateway/register.jade'
		}).state('profile', {
			url: '/profile',
			templateUrl: 'profile/profile.jade'
		}).state('notifications', {
			url: '/notifications',
			templateUrl: 'profile/notifications.jade'
		}).state('home', {
			url: '/home',
			templateUrl: 'home/home.jade'
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
			templateUrl: 'events/events.jade'
			// controller: 'EventsController'
		}).state('albums', {
			url: '/albums',
			templateUrl: 'albums/albums.jade',
			controller: 'AlbumsController'
		});

	$locationProvider.html5Mode({ enabled: true, baseLocation: false});
}]);
