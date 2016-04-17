angular.module('wolfpackApp').controller('EventsController', function($scope, moment) {


	$scope.tagline = 'Events Page';

	$scope.loading = false;

	var dateFormat = 'MMM Do YYYY';

	$scope.days = [
		{date: moment(new Date()).format(dateFormat), events: [{name: 'Brents Birthday', note: 'Everyone is invited!'}, {name: '4th of July', note: 'National Holiday'},  {name: 'Brandts Wedding', note: 'Smooth and creamy beige'}, {name: 'Charizard Party', note: 'Like...Rawr.'}]},
		 	{date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 7}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 14}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 21}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}
	];


});
