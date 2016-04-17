angular.module('wolfpackApp').controller('EventsController', function($scope, moment) {

	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	$scope.weekdays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];


	$scope.tagline = 'Events Page';

	$scope.loading = false;

	$scope.month = '';
	$scope.startDay = null;

	var dateFormat = 'Do';
	var daysToShow = 28;


	function init() {

		$scope.startDay = moment(new Date()).startOf('week');
		$scope.month = getMonthName($scope.startDay.month());

	}
	init();

	$scope.days = [
		{date: $scope.startDay.format(dateFormat), events: [{name: 'Brents Birthday', note: 'Everyone is invited!'}, {name: '4th of July', note: 'National Holiday'},  {name: 'Brandts Wedding', note: 'Smooth and creamy beige'}, {name: 'Charizard Party', note: 'Like...Rawr.'}]},
		 	{date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 7}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 14}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1},
		{date: 21}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}, {date: 1}
	];

	function getMonthName(index) {
		return months[index] + ' ' + $scope.startDay.format('YYYY');
	}


	$scope.moveToPrev = function() {
		$scope.startDay.subtract(28, 'days');
		$scope.month = getMonthName($scope.startDay.month());
	};

	$scope.moveToNext = function() {
		$scope.startDay.add(28, 'days');
		$scope.month = getMonthName($scope.startDay.month());
	};



});
