angular.module('wolfpackApp').factory('EventContentFactory', ['$http', function($http) {

    var eventURL = '/api/events';

    return {
        getEvents: getEvents
        // updateEvent: updateEvent,
        // addEvent: addEvent
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

}]);
