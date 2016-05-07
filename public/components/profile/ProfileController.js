angular.module('app')
.controller('ProfileController', function($scope, $cookieStore, UserService) {


    $scope.currentUser = null;

    function init() {
        UserService.GetByUsername($cookieStore.get('globals').currentUser.username).success(function(result) {
            
        // TODO: change this password to hash and salt
            result.details.password = "";
            $scope.currentUser = result.details;
        });
    }
    init();


});
