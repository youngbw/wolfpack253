
angular.module('app').controller('HomeController', ['$scope', function($scope) {

    $scope.tagline = "Home Page";

    $scope.serverName = '';
    $scope.serverPW = '';
    $scope.serverPort = '';

    $scope.features = [
        {
            title: 'Guilds',
            image: '../img/guilds.jpg',
            route: '/guilds'
        },
        {
            title: 'Events',
            image: './img/events.jpg',
            route: '/events'
        },
        {
            title: 'Chats',
            image: '/img/chats.jpg',
            route: '/chats'
        },
        {
            title: 'Albums',
            image: 'img/albums.jpg',
            route: '/albums'
        }
    ];

}]);
