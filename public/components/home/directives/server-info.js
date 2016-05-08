angular.module('app').directive('serverInfo', function(HomeContentFactory, ErrorService) {

    return {
        restrict: 'A',
        templateUrl: '/home/directives/server-info.jade',
        link: {
            post: function(scope, elem, attrs) {

                scope.heading = '';
                scope.serverInfoShowing = false;
                scope.serverName = '';
                scope.serverPW = '';
                scope.serverPort = '';

                scope.sendServerChange = function() {
                    var name = $('#serverNameField').val();
                    var password = $('#serverPWField').val();
                    var port = $('#serverPortField').val();

                    if (name === '') {
                        name = scope.serverName;
                    }
                    if (password === '') {
                        password = scope.serverPW;
                    }
                    if (port === '') {
                        port = scope.serverPort;
                    }

                    if (validateInfo()) {
                        $('#serverNameField').val('');
                        $('#serverPWField').val('');
                        $('#serverPortField').val('');
                        if (scope.serverName !== '') {
                            changeServerInfo(name, password, port);
                        } else {
                            createServerInfo(name, password, port);
                        }
                        scope.serverInfoShowing = false;
                    }

                }


                init();
                function init() {
                    scope.heading = 'What changes would you like to make?';
                    getServerInfo();
                }


                function getServerInfo() {
                    HomeContentFactory.getServerInfo().success(function(result) {
                        result = result[0];
                        scope.serverName = result.name;
                        scope.serverPW = result.password;
                        scope.serverPort = result.port;
                    }).error(function(result) {
                        ErrorService.moveToError(result.details);
                    });
                };

                function changeServerInfo(name, password, port) {
                    HomeContentFactory.changeServerInfo({name: name, password: password, port: port}).success(function(result) {
                        scope.serverName = result.name;
                        scope.serverPW = result.password;
                        scope.serverPort = result.port;
                    }).error(function(result) {
                        ErrorService.moveToError(result.details);
                    });
                }

                function createMessage(name, password, port) {
                    HomeContentFactory.createMessage({name: name, password: password, port: port}).success(function(result) {
                        scope.serverName = result.name;
                        scope.serverPW = result.password;
                        scope.serverPort = result.port;
                    }).error(function(result) {
                        ErrorService.moveToError(result.details);
                    });
                }

                scope.showServerInfo = function() {
                    scope.serverInfoShowing = !scope.serverInfoShowing;

                };

                function validateInfo(name, pw, port) {
                    var isName = scope.serverName === '' && name === '';
                    var isPW = scope.serverPW === '' && pw === '';
                    var isPort = scope.serverPort === '' && port === '';
                    return !isName && !isPW && !isPort;
                }
            }
        }
    };


});
