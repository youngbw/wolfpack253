angular.module('app').config([
	'$stateProvider',
	'$locationProvider',
	 function($stateProvider, $locationProvider) {

	$locationProvider.html5Mode({ enabled: true, baseLocation: false});
}]);
