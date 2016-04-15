
angular.module('wolfpackApp').controller('HomeController', ['$scope', '$location', '$route', '$state', 'HomeContentFactory', function($scope, $location, $route, $state, HomeContentFactory) {

    $scope.$route = $state;
    $scope.tagline = "Home Page";

    $scope.message = null
    $scope.status = null
    $scope.author = null


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
        if ($scope.message === null) {
            HomeContentFactory.getMOTD().success(function(result) {
                $scope.message = result.message;
                $scope.author = result.author;
                $scope.status = result.status;
            });
        }
        $scope.$on('dailyMessageChange', function(event, args) {
            console.log(args.message);
            $scope.message = args.message;
            $scope.author = args.author;
            $scope.type = '';
        });
    }
    init();

}]);
