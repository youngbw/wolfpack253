angular.module('wolfpackApp').factory('HomeContentFactory', ['$http', function($http) {

    var urlBase = '/motd';
    var dataFactory = {};
    dataFactory.motd;
    dataFactory.motdAuthor;
    dataFactory.status;

    dataFactory.getMOTD = function() {
        return $http.get(urlBase);
            // .success(function(message) {
            //     dataFactory.motd = message.message;
            //     dataFactory.motdAuthor = message.author;
            //     dataFactory.status = '' + message.status + ' ' + message.statusText;
            // })
            // .error(function(error) {
            //     dataFactory.status = 'Unable to load the MOTD: ' + error.message;
            //     dataFactory.motd = '';
            //     dataFactory.motdAuthor = '';
            // });
    }

    dataFactory.createMessage = function(message) {
        return $http.post(urlBase, message);
    }

    dataFactory.changeMessage = function(message) {
        return $http.put(urlBase, message);
        // .success(function(result) {
        //     dataFactory.motd = result.message;
        //     dataFactory.motdAuthor = result.author;
        //     dataFactory.status = '' + result.status + ' ' + result.statusText;
        // })
        // .error(function(error) {
        //
        // });
    }

    return dataFactory;

}]);
