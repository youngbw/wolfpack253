angular.module('wolfpackApp').controller('EventsController', ['$scope', function($scope) {


	$scope.tagline = 'Events Page';

	$scope.loading = false;


	$scope.days = [
		{date: 0}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 7}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 14}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 21}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}
	];


}]);
