angular.module('app')
    .controller('GatewayController', function($scope, AuthenticationService, ErrorService) {


        $scope.errorMessage = ''; // This will serve as the "global" error message

        ErrorService.moveToError = function(msg) { // call this method like ErrorService.moveToError(msg) from other controllers to invoke an error div
            $scope.errorMessage = msg;
        };

        ErrorService.clearError = function() { // This will remove the error div from the screen
            $scope.errorMessage = '';
        }

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
