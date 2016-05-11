angular.module('app')
    .controller('NotificationsController', function($scope, UserService, $cookieStore, ErrorService) {

        $scope.currentUserID = '';
        $scope.adminRequests = [];

        function init() {
            UserService.GetByUsername($cookieStore.get('globals').currentUser.username).success(function(result) {
                $scope.currentUserID = result.details._id;
            }).error(function(result) {
                ErrorService.moveToError('There was a problem verifying the current user.')
            });

            UserService.getAllAdminRequests().success(function(result) {
                $scope.adminRequests = result.details;
                console.log(result);
            }).error(function(result) {
                ErrorService.movetoError(result.details);
            });
        }
        init();


    });
