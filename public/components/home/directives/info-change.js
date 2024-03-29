angular.module('app').directive('infoChange', function(HomeContentFactory, UserService, $cookieStore, ErrorService) {

    return {
        restrict: 'A',
        templateUrl: '/home/directives/info-change.jade',
        link: {
            post: function(scope, elem, attrs) {

                scope.heading = '';
                scope.message = '';
                scope.author = '';
                scope.isShowing = false;
                scope.isAmin = false;

                scope.currentUserName = null;

                scope.sendChange = function() {
                    ErrorService.clearError();
                    var theMessage = $('#dailyMessageField').val();
                    $('#dailyMessageField').val('');
                    if (scope.currentUserName !== null) {
                        if (scope.message !== '') {
                            changeMessage(theMessage, scope.currentUserName);
                        } else {
                            createMessage(theMessage, scope.currentUserName);
                        }
                        scope.isShowing = false;
                    } else {
                        ErrorService.moveToError('There is no user currently logged in to associate with  this post.');
                    }
                }


                init();
                function init() {
                    scope.heading = 'What changes would you like to make?';
                    scope.currentUserName = $cookieStore.get('globals').currentUser.username;
                    console.log(scope.currentUserName + 'name');
                    getCurrentUser();
                    getDailyMessage();
                }

                function getDailyMessage() {
                    HomeContentFactory.getMOTD().success(function(result) {
                        scope.message = result.message;
                        scope.author = result.author;
                    }).error(function(result) {
                        ErrorService.moveToError(result.details);
                    });
                }

                function changeMessage(theMessage, theAuthor) {
                    HomeContentFactory.changeMessage({message: theMessage, author: theAuthor}).success(function(result) {
                        scope.message = result.message;
                        scope.author = result.author;
                    }).error(function(result) {
                        ErrorService.moveToError(result.details);
                    });
                }

                function createMessage(theMessage, theAuthor) {
                    HomeContentFactory.createMessage({message: theMessage, author: scope.currentUserName}).success(function(result) {
                        scope.message = result.message;
                        scope.author = result.author;
                    }).error(function(result) {
                        ErrorService.moveToError(result.details);
                    });
                }

                function getCurrentUser() {
                    UserService.GetByUsername($cookieStore.get('globals').currentUser.username).success(function(result) {
                        scope.isAdmin = result.details.admin;
                    }).error(function(result) {
                        ErrorService.moveToError('Could not verify admin status.');
                    });
                }

                scope.showInfo = function() {
                    scope.isShowing = !scope.isShowing;

                };
            }
        }
    };


});
