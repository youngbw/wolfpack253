angular.module('app').directive('infoChange', function(HomeContentFactory, UserService, $cookieStore) {

    return {
        restrict: 'A',
        templateUrl: '/home/directives/info-change.jade',
        link: {
            post: function(scope, elem, attrs) {

                scope.heading = '';
                scope.message = '';
                scope.author = '';
                scope.isShowing = false;

                scope.currentUserName = null;

                scope.sendChange = function() {
                    var theMessage = $('#dailyMessageField').val();
                    $('#dailyMessageField').val('');
                    if (scope.message !== '') {
                        changeMessage(theMessage, scope.currentUserName);
                    } else {
                        createMessage(theMessage, scope.currentUserName);
                    }
                    scope.isShowing = false;
                }


                init();
                function init() {
                    scope.heading = 'What changes would you like to make?';
                    scope.currentUserName = $cookieStore.get('globals').currentUser.username;
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
                    HomeContentFactory.createMessage({message: theMessage, author: scope.currentUserName}).success(function(result) {
                        scope.message = result.message;
                        scope.author = result.author;
                    });
                }

                scope.showInfo = function() {
                    scope.isShowing = !scope.isShowing;

                };
            }
        }
    };


});
