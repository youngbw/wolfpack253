angular.module('app').controller('EventsController', function($scope, moment, EventContentFactory, ngDialog, $rootScope, ErrorService) {

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

	// this will hold the main data structure
	$scope.days = [];

	// these are for the modal
	$scope.modalTitle = '';
	$scope.modalType = '';
	$scope.picker;
	$scope.loading = false;

	// the are for the edit modal
	$scope.currentTitle;
	$scope.currentDescription;
	$scope.currentDate;
	$scope.currentEvent;
	$scope.currentEventIndex;

	// these are for the view all
	var currentDayIndex;
	$scope.currentDay;

	$scope.month = '';
	$scope.startDay = null;
	$scope.backDays = 0;
	$scope.forwardDays = 0;

	var addEventDialog;
	var dateFormat = 'Do';
	var daysToShow = 28;
	var numDeletes = 0;


	function init() {

		// This will bring us back to the beginning of the current month
		$scope.startDay = moment(new Date()).startOf('month');

		// This will be the start date placeholder for the add dialog date chooser
		$scope.myDate = moment(new Date()).format('Do MMM YYYY');

		setEndOfMonthAndQuery();

	}
	init();

	function getMonthName(index) {
		return months[index] + ' ' + $scope.startDay.clone().format('YYYY');
	}


	$scope.moveToPrev = function() {
		if (!$scope.loading) {
			$scope.startDay.subtract(15, 'days').startOf('month');
			setEndOfMonthAndQuery();
		}
	};

	$scope.moveToNext = function() {
		if (!$scope.loading) {
			$scope.startDay.add(40, 'days').startOf('month');
			setEndOfMonthAndQuery();

		}
	};

	// TODO: This post request wont return if you send a title (required) through as ""
	function createEvent(title, note, date) {
		if (title !== "") {
			EventContentFactory.addEvent(title, note, date.toDate()).success(function(result) {
				$scope.closeModal();
				setEndOfMonthAndQuery();
			}).error(function(result) {
				ErrorService.moveToError(result.details);
			});
		}
	}

	function updateEvent(id, title, note, date) {
		if (title !== "") {
			EventContentFactory.updateEvent(id, title, note, date).success(function(results) {
				$scope.closeModal();
				setEndOfMonthAndQuery();
			}).error(function(result) {
				ErrorService.moveToError(result.details);
			});
		}
	}

	function performDelete() {
		EventContentFactory.deleteEvent($scope.currentEvent._id).success(function(results) {
			$scope.closeModal();
			setEndOfMonthAndQuery();
		}).error(function(result) {
			ErrorService.moveToError(result.details);
		});
	}

	function queryDates(start, end) {

		var difference = end.diff(start, 'days') + 1;

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
			setDates(start, result.eventData, difference);
			clearTimeout(timer);
			$scope.loading = false;
		}).error(function(result) {
			ErrorService.moveToError(result.details);
			clearTimeout(timer);
			$scope.loading = false;
		});
	}

	function setDates(firstDay, events, difference) {
		$scope.days = [];
		// add the actual calendar date to the $scope.days struct
		for (var j = 0; j < difference; j++) {
			$scope.days.push({date: firstDay.clone(), insideMonth: j < $scope.backDays || j >= difference - $scope.forwardDays });
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
		// var next = $scope.startDay.clone().add(daysToShow - 1, 'days').month();
		// if (next !== $scope.startDay.month()) {
		// 	$scope.month += ' / ' + getMonthName(next);
		// }
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
		$scope.currentDay = $scope.days[dayIndex];
		$scope.currentEvent = $scope.days[dayIndex].events[eventIndex];
		$scope.currentDayIndex = dayIndex;
		$scope.currentEventIndex = eventIndex;
		setCurrentEventData();
		if (addEventDialog === undefined) {
			openModal();
		}
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

		// This runs when the modal is close, even if its just by clickout outside of modal
		addEventDialog.closePromise.then(function (data) {
			addEventDialog = undefined;
			resetCurrent();
		});
	}

	$scope.closeModal = function() {
		addEventDialog.close();
	};

	$scope.editEvent = function(index) {
		if (index !== undefined) {
			$scope.viewEvent($scope.currentDayIndex, index);
		}

		$scope.modalType = 'Edit';
		$scope.modalTitle = 'Edit Event';
	};

	$scope.viewAllEvents = function(index) {
		$scope.modalType = 'viewAll';
		$scope.modalTitle = 'All Events for the ' + $scope.formatDate(index);
		$scope.currentDay = $scope.days[index];
		$scope.currentDayIndex = index;
		openModal();
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

	$scope.deleteEvent = function(index) {
		numDeletes += 1;
		if (numDeletes == 1) {
			$('#deleteBtn').removeClass('btn-warning').addClass('btn-danger');
		} else if (numDeletes == 2) {
			if (index !== undefined) {
				$scope.currentEvent = $scope.days[$scope.currentDayIndex].events[index];
			}
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
		$scope.currentDay = undefined;
		$scope.currentDayIndex = undefined;
	}

	$scope.moveToEvent = function(num) {
		$scope.currentEventIndex = ($scope.currentEventIndex + num) % $scope.days[$scope.currentDayIndex].events.length;
		if ($scope.currentEventIndex === -1) {
			$scope.currentEventIndex = $scope.days[$scope.currentDayIndex].events.length - 1;
		}
		$scope.currentEvent = $scope.days[$scope.currentDayIndex].events[$scope.currentEventIndex];
		setCurrentEventData();
	};

	function setCurrentEventData() {
		$scope.currentTitle = $scope.currentEvent.name;
		$scope.currentDescription = $scope.currentEvent.note;
		$scope.currentDate = moment($scope.currentEvent.date).format('YYYY MMM Do');
	}

	function setEndOfMonthAndQuery() {
		setMonth();

		// These will be used for the grayed out dates
		$scope.backDays = $scope.startDay.day();

		var monthEnd = $scope.startDay.clone().endOf('month');
		$scope.startDay.subtract($scope.startDay.day(), 'days');

		// These will be used for the grayed out dates
		$scope.forwardDays = 6 - monthEnd.day();

		monthEnd.add(6 - monthEnd.day(), 'days');
		queryDates($scope.startDay.clone(), monthEnd);
	}

});
