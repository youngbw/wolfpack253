

angular.module('HomeCtrl', []).controller('HomeController', ['$scope', function($scope) {

    $scope.tagline = "Home Page";
    $scope.features = [
        {
            "name": "Guilds"
        },
        {
            "name": "Events"
        },
        {
            "name": "Chats"
        },
        {
            "name": "Albums"
        }
    ];

}]);
