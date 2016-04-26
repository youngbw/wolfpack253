angular.module('app', ['ui.router', 'ngRoute', 'ngAnimate', 'angularMoment', 'ngDialog']);


angular.module('app').config(function (ngDialogProvider) {
    ngDialogProvider.setOpenOnePerName(true);
});
