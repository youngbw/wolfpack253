angular.module('app')
    .factory('UserService', function($http) {
    var service = {};

    // service.GetAll = GetAll;
    // service.GetById = GetById;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;
    service.getAllAdminRequests = getAllAdminRequests;
    service.updateAdmin = updateAdmin;
    service.requestAdmin = requestAdmin;

    return service;

    // function GetAll() {
    //     return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
    // }
    //
    // function GetById(id) {
    //     return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
    // }

    function GetByUsername(username) {
        return $http.get('/api/users/' + username);
    }

    function Create(user) {
        return $http.post('/api/users', user);
    }

    function Update(user) {
        return $http.put('/api/users/' + user._id, user);
    }

    function Delete(id) {
        return $http.delete('/api/users/' + id);
    }

    function getAllAdminRequests() {
        return $http.get('/api/admin');
    }

    function updateAdmin(trueAdminID, requesterId, decision) {
        return $http.put('/api/users/' + trueAdminID + '/admin/' + requesterId, {decision: decision});
    }

    function requestAdmin(username) {
        return $http.post('/api/admin', {username: username});
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }

});
