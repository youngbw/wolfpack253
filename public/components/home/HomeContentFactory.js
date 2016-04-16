angular.module('wolfpackApp').factory('HomeContentFactory', ['$http', function($http) {

    var messageURL = '/motd';
    var serverURL = '/serverinfo';
    var dataFactory = {};

    // MOTD METHODS
    dataFactory.getMOTD = function() {
        return $http.get(messageURL);
    }

    dataFactory.createMessage = function(message) {
        return $http.post(urlBase, messageURL);
    }

    dataFactory.changeMessage = function(message) {
        return $http.put(messageURL, message);
    }

    // SERVER METHODS
    dataFactory.getServerInfo = function() {
        return $http.get(serverURL);
    }

    dataFactory.changeServerInfo = function(info) {
        return $http.put(serverURL, info);
    }

    dataFactory.createServerInfo = function(info) {
        return $http.post(serverURL, info);
    }

    return dataFactory;

}]);
