angular.module('wolfpackApp').directive('infoChange', function(HomeContentFactory, $rootScope) {

    return {
        restrict: 'A',
        templateUrl: '/home/directives/info-change.jade',
        link: {
            post: function(scope, elem, attrs) {

                scope.heading = '';
                scope.message = '';
                scope.author = '';

                scope.sendChange = function() {
                    // This is for the daily Message case
                    if (attrs.info === 'dailyMessage') {
                        var theMessage = $('#dailyMessageField').val();
                        if (scope.message !== '') {
                            changeMessage(theMessage, 'Brent');
                        } else {
                            createMessage(theMessage, 'Brent');
                        }
                        $rootScope.$broadcast('dailyMessageChange', {message: scope.message, author: scope.author});
                    // This is for the vent info case
                    } else if (attrs.info === 'ventInfo') {

                    }

                }


                init();
                function init() {
                    scope.heading = 'What changes would you like to make?';
                    getDailyMessage();
                }

                function getDailyMessage() {
                    HomeContentFactory.getMOTD().success(function(result) {
                        scope.message = result.message;
                        scope.author = result.author;
                    });
                }

                function changeMessage(theMessage, theAuthor) {
                    HomeContentFactory.changeMessage({message: theMessage, author: theAuthor}).success(function(result) {
                        scope.message = result.message;
                        scope.author = result.author;
                    });
                }

                function createMessage(theMessage, theAuthor) {
                    HomeContentFactory.createMessage({message: theMessage, author: "Brent"}).success(function(result) {
                        scope.message = result.message;
                        scope.author = result.author;
                    });
                }
            }
        }
    };


});
