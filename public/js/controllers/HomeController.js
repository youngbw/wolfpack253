

app.controller('HomeController', ['$scope', function($scope) {

    $scope.tagline = "Home Page";
    $scope.tabs = [
        {
            title: 'Guilds',
            price: 100
        },
        {
            title: 'Events',
            price: 100
        },
        {
            title: 'Chats',
            price: 100
        },
        {
            title: 'Albums',
            price: 100
        }
    ];

}]);
