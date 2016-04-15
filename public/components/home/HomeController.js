
angular.module('wolfpackApp').controller('HomeController', ['$scope', '$location', '$route', '$state', 'HomeContentFactory', function($scope, $location, $route, $state, HomeContentFactory) {

    $scope.$route = $state;
    $scope.tagline = "Home Page";

    $scope.dailyMessage = {
        message: null,
        status: null,
        author: null
    }

    $scope.type = '';
    var isShowing = false;

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

    $scope.showInfo = function(type) {
        if ($scope.type === type) {
            isShowing = false;
            $scope.type = '';
        } else {
            $scope.type = type;
            isShowing = true;
        }

    };

    function init() {
        if ($scope.dailyMessage.message === null) {
            HomeContentFactory.getMOTD().success(function(result) {
                $scope.dailyMessage.message = result.message;
                $scope.dailyMessage.author = result.author;
                $scope.dailyMessage.status = result.status;
            });
        }
        console.log($scope.dailyMessage.message);
    }
    init();

}]);
