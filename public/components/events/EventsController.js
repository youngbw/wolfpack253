angular.module('wolfpackApp').controller('EventsController', function($scope, moment, EventContentFactory, ngDialog, $rootScope) {

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

	$scope.days = [];

	$scope.modalTitle = '';
	$scope.picker;
	$scope.myDate;
	$scope.loading = false;

	$scope.month = '';
	$scope.startDay = null;

	var dateFormat = 'Do';
	var daysToShow = 28;


	function init() {

		// This will bring us back to the beginning of the current month
		$scope.startDay = moment(new Date()).startOf('month');

		// This will set us back a few days to the start of the week that contains the first of the month to match up sundays
		$scope.startDay.subtract($scope.startDay.day(), 'days');

		$scope.myDate = moment(new Date()).format('Do MMM YYYY');

		// $scope.month = getMonthName($scope.startDay.month());
		queryDates($scope.startDay.clone(), $scope.startDay.clone().add(daysToShow, 'days'));

	}
	init();

	function getMonthName(index) {
		return months[index] + ' ' + $scope.startDay.format('YYYY');
	}


	$scope.moveToPrev = function() {
		$scope.startDay.subtract(daysToShow, 'days');
		queryDates($scope.startDay.clone(), $scope.startDay.clone().add(daysToShow, 'days'));
	};

	$scope.moveToNext = function() {
		$scope.startDay.add(daysToShow, 'days');
		queryDates($scope.startDay.clone(), $scope.startDay.clone().add(daysToShow, 'days'));
	};

	function queryDates(start, end) {
		//only show the loader if the call takes longer than a second
		var timer;
		timer && clearTimeout(timer);
        timer = setTimeout(function()
        {
            $scope.loading = true;
        },
        1000);


		// The call uses exlcusive for start date
		EventContentFactory.getEvents(start.subtract(1, 'days'), end).success(function(result) {
			setDates(start, result.eventData);
			setMonth();
			clearTimeout(timer);
			$scope.loading = false;
		}).error(function(err) {
			console.log(err);
			clearTimeout(timer);
			$scope.loading = false;
		});
	}

	function setDates(firstDay, events) {
		$scope.days = [];
		// add the actual calendar date to the $scope.days struct
		for (var j = 0; j < daysToShow; j++) {
			$scope.days.push({date: firstDay.clone()});
			firstDay.add(1, 'days');
		}

		// add events into the appropriate days
		var index = 0;
		for (var i = 0; i < $scope.days.length; i++) {
			var list = [];
			while ( index < events.length && moment(events[index].date).isSame($scope.days[i].date)) {
				list.push(events[index]);
				index += 1;
			}
			$scope.days[i].events = list;
		}
	}

	$scope.formatDate = function(index) {
		var theDate = $scope.days[index].date;
		return theDate.format(dateFormat);
	}

	function setMonth() {
		$scope.month = getMonthName($scope.startDay.month());
		var next = $scope.startDay.clone().add(daysToShow - 1, 'days').month();
		if (next !== $scope.startDay.month()) {
			$scope.month += ' / ' + getMonthName(next);
		}
	}

	$scope.openAddDialog = function() {
		$scope.modalTitle = 'Create New Event';
		ngDialog.open({
			template: '/events/eventModal.jade',
			scope: $scope,
			showClose: false,
			name: 'addEventDialog',
			className: 'ngdialog-theme-default event_add-dialog'
		});
	};

	$scope.initPicker = function() {
		if (typeof picker === 'undefined') {
			picker = $('.datepicker');
		}
		picker.pickadate({});
	};

});
