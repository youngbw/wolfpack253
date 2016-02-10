

app.controller('HomeController', ['$scope', function($scope) {

    $scope.tagline = "Home Page";
    $scope.features = [
        {
            title: 'Guilds',
            image: '/img/guilds.jpg'
        },
        {
            title: 'Events',
            image: '/img/events.jpg'
        },
        {
            title: 'Chats',
            image: '/img/chats.jpg'
        },
        {
            title: 'Albums',
            image: '/img/albums.jpg'
        }
    ];

}]);
