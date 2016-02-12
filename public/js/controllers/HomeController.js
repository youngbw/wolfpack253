

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
    ]

    $scope.enlargeItem = function(event) {
        // $(event.currentTarget).height(function(index, height) {
        //     $(this).height(height + 20);
        // });

        $(event.currentTarget).width(function(index, width) {
            // $(this).width(width + 10);
        });

    }

    $scope.ensmallItem = function(event) {
        // $(event.currentTarget).height(function(index, height) {
        //     $(this).height(height - 20);
        // });

        $(event.currentTarget).width(function(index, width) {
            // $(this).width(width - 10);
        });

    }


}]);
