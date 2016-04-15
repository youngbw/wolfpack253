
angular.module('wolfpackApp').controller('HomeController', ['$scope', '$location', '$route', '$state', function($scope, $location, $route, $state) {

    $scope.$route = $state;
    $scope.tagline = "Home Page";


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

    $scope.go = function(hash) {
        $location.path( hash );
    };

    $scope.mouseEntered = function(event) {
        $(event.currentTarget).css({
            'border': '2px solid #94BA65'
        });
    };

    $scope.mouseExited = function(event) {
        $(event.currentTarget).css({
            'border': '2px solid black'
        });
    };

}]);
