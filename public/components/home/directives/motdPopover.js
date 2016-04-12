angular.module('wolfpackApp').directive('motdPopover', function() {

    return {
        restrict: 'A',
        repalce: true,
        controller: 'HomeController',
        link: function(scope, elem, attr) {

            console.log("hittin here");

        }
    };


});
