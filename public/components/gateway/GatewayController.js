angular.module('app')
    .controller('GatewayController', function($scope, AuthenticationService) {

        $scope.logout = function() {
            AuthenticationService.ClearCredentials();
        };

        $scope.features = [
            {
                title: 'Guilds',
                image: '../img/guilds.jpg',
                route: 'guilds',
                active: false,
                icon: 'fa fa-gamepad'
            },
            {
                title: 'Events',
                image: './img/events.jpg',
                route: 'events',
                active: true,
                icon: 'fa fa-calendar-check-o'
            },
            {
                title: 'Chats',
                image: '/img/chats.jpg',
                route: 'chats',
                active: false,
                icon: 'fa fa-weixin'
            },
            {
                title: 'Albums',
                image: 'img/albums.jpg',
                route: 'albums',
                active: false,
                icon: 'fa fa-picture-o'
            }
        ];


    });
