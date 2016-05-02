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
	$scope.modalType = '';
	$scope.picker;
	$scope.loading = false;

	$scope.currentTitle;
	$scope.currentDescription;
	$scope.currentDate;
	$scope.currentEvent;

	$scope.month = '';
	$scope.startDay = null;

	var addEventDialog;
	var dateFormat = 'Do';
	var daysToShow = 28;
	var numDeletes = 0;


	function init() {

		// This will bring us back to the beginning of the current month
		$scope.startDay = moment(new Date()).startOf('month');

		// This will set us back a few days to the start of the week that contains the first of the month to match up sundays
		$scope.startDay.subtract($scope.startDay.day(), 'days');

		// This will be the start date placeholder for the add dialog date chooser
		$scope.myDate = moment(new Date()).format('Do MMM YYYY');

		// $scope.month = getMonthName($scope.startDay.month());
		queryDates($scope.startDay.clone(), $scope.startDay.clone().add(daysToShow, 'days'));

	}
	init();

	function getMonthName(index) {
		return months[index] + ' ' + $scope.startDay.clone().format('YYYY');
	}


	$scope.moveToPrev = function() {
		if (!$scope.loading) {
			$scope.startDay.subtract(daysToShow, 'days');
			queryDates($scope.startDay.clone(), $scope.startDay.clone().add(daysToShow, 'days'));
		}
	};

	$scope.moveToNext = function() {
		if (!$scope.loading) {
			$scope.startDay.add(daysToShow, 'days');
			queryDates($scope.startDay.clone(), $scope.startDay.clone().add(daysToShow, 'days'));
		}
	};

	// TODO: This post request wont return if you send a title (required) through as ""
	function createEvent(title, note, date) {
		if (title !== "") {
			EventContentFactory.addEvent(title, note, date.toDate()).success(function(result) {
				addEventDialog.close();
				queryDates($scope.startDay.clone(), $scope.startDay.clone().add(daysToShow, 'days'));
			}).error(function(result) {
				console.log(result);
			});
		}
	}

	function updateEvent(id, title, note, date) {
		if (title !== "") {
			EventContentFactory.updateEvent(id, title, note, date).success(function(results) {
				addEventDialog.close();
				queryDates($scope.startDay.clone(), $scope.startDay.clone().add(daysToShow, 'days'));
			}).error(function(result) {
				console.log(result);
			});
		}
	}

	function performDelete() {
		EventContentFactory.deleteEvent($scope.currentEvent._id).success(function(results) {
			addEventDialog.close();
			queryDates($scope.startDay.clone(), $scope.startDay.clone().add(daysToShow + 1, 'days'));
		}).error(function(result) {
			console.log(result);
		});
	}

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
		EventContentFactory.getEvents(start.clone().subtract(1, 'days'), end).success(function(result) {
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
			while (index < events.length && momentEqual(moment(events[index].date), $scope.days[i].date)) {
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
		$scope.modalType = 'Add';
		resetCurrent();
		openModal();
	};

	$scope.initPicker = function(theType) {
		var theInput = $('.datepicker').pickadate({
			container: '.event_modal-title'
		});
		$scope.picker = theInput.pickadate('picker');
		if (typeof $scope.currentDate !== 'undefined' && theType === 'edit') {
			$scope.picker.set('select', moment($scope.currentEvent.date).toDate());
		} else {
			$scope.picker.set('select', new Date());
		}
	};

	$scope.addNewEvent = function() {
		var title = $('#eventNameField').val();
		var note = $('#eventDescField').val();
		var theDate;
		if (typeof $scope.picker !== 'undefined') {
			theDate = moment($scope.picker.get('select', 'yyyy-mm-dd'));
		} else {
			theDate = moment(new Date()).subtract(1, 'days');
		}
		// theDate = moment(theDate).subtract(1, 'days');
		createEvent(title, note, theDate);
	}

	$scope.viewEvent = function(dayIndex, eventIndex) {
		$scope.modalTitle = 'Event';
		$scope.modalType = 'View';
		$scope.currentEvent = $scope.days[dayIndex].events[eventIndex];
		$scope.currentTitle = $scope.currentEvent.name;
		$scope.currentDescription = $scope.currentEvent.note;
		$scope.currentDate = moment($scope.currentEvent.date).format('YYYY MMM Do');
		openModal();
	};

	function openModal() {
		numDeletes = 0;
		addEventDialog = ngDialog.open({
			template: '/events/eventModal.jade',
			scope: $scope,
			showClose: false,
			name: 'addEventDialog',
			className: 'ngdialog-theme-default event_add-dialog'
		});
	}

	$scope.closeModal = function() {
		addEventDialog.close();
	};

	$scope.editEvent = function() {
		$scope.modalType = 'Edit';
		$scope.modalTitle = 'Edit Event';
	};

	$scope.saveEvent = function() {
		var theDate = $('#eventDate').val();
		if (theDate === '') {
			theDate = $scope.currentEvent.date;
		}
		// theDate = moment(theDate);
		var title = $('#eventNameField').val() === "" ? $scope.currentTitle : $('#eventNameField').val();
		var note = $('#eventDescField').val() === "" ? $scope.currentDescription : $('#eventDescField').val();
		var id = $scope.currentEvent._id;
		updateEvent(id, title, note, theDate);
	};

	$scope.deleteEvent = function() {
		numDeletes += 1;
		if (numDeletes == 1) {
			$('#deleteBtn').removeClass('btn-warning').addClass('btn-danger');
		} else if (numDeletes == 2) {
			performDelete();
			numDeletes = 0;
			numDeletes = 0;$('#deleteBtn').removeClass('btn-danger').addClass('btn-warning');

		}
	};

	function momentEqual(date1, date2) {
		if (!moment.isMoment(date1) || !moment.isMoment(date2)) {
			return false;
		}
		var years = date1.year() === date2.year();
		var months = date1.month() === date2.month();
		var days = date1.date() === date2.date();
		return years && months && days;

	}

	function resetCurrent() {
		$scope.currentDate = undefined;
		$scope.currentEvent = undefined;
		$scope.currentTitle = undefined;
		$scope.currentDescription = undefined;
	}

});
