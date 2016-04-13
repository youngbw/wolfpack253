angular.module('wolfpackApp').directive('infoChange', function(HomeContentFactory) {

    return {
        restrict: 'A',
        templateUrl: '/home/directives/info-change.jade',
        controller: 'HomeController',
        link: {
            post: function(scope, elem, attrs) {

                scope.heading = '';

                scope.sendChange = function() {
                    // This is for the daily Message case
                    if (attrs.info === 'dailyMessage') {
                        var theMessage = $('#dailyMessageField').val();
                        if (attrs.message !== '' && attrs.message !== null) {
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
                }


            }
        }
    };


});
