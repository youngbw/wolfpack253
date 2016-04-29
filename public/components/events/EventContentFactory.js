angular.module('wolfpackApp').factory('EventContentFactory', ['$http', function($http) {

    var eventURL = '/api/events';

    return {
        getEvents: getEvents,
        updateEvent: updateEvent,
        addEvent: addEvent,
        deleteEvent: deleteEvent
    }

    // This method is expecting moment objects for the parameters
    function getEvents(startDate, endDate) {
        return $http.get(eventURL,
        {
            params: {
                queryStartDate: startDate.toDate(),
                queryEndDate: endDate.toDate()
            }
        });
    }

    function addEvent(name, note, date) {
        return $http.post(eventURL, {name: name, note: note, date: date});
    }

    function updateEvent(_id, name, note, date) {
        return $http.put(eventURL + '/' + _id, {name: name, note: note, date: date});
    }

    function deleteEvent(_id) {
        return $http.delete(eventURL + '/' + _id);
    }

}]);
