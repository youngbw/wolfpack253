angular.module('wolfpackApp').controller('EventsController', function($scope) {


	$scope.tagline = 'Events Page';

	$scope.loading = false;


	$scope.days = [
		{date: 0, events: [{name: 'Brents Birthday', note: 'Everyone is invited!'}, {name: '4th of July', note: 'National Holiday'}]}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 7}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 14}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 21}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}
	];


});
