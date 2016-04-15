angular.module('wolfpackApp').directive('infoChange', function(HomeContentFactory) {

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
                            HomeContentFactory.changeMessage({message: theMessage, author: "Brent"});
                        } else {
                            HomeContentFactory.createMessage({message: theMessage, author: "Brent"});
                        }
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
                        console.log("hitting it");
                    });
                }


            }
        }
    };


});
