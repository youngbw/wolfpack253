angular.module('app')
.controller('ProfileController', function($scope, $cookieStore, $rootScope, UserService, AuthenticationService) {


    $scope.currentUser = null;
    $scope.errorMessage = '';
    $scope.numDeletes = 0;

    function init() {
        UserService.GetByUsername($cookieStore.get('globals').currentUser.username).success(function(result) {

            result.details.password = "";
            $scope.currentUser = result.details;
            console.log($scope.currentUser);
        });
    }
    init();


    $scope.save = function() {
        var goodToGo = true;
        $scope.errorMessage = '';
        $scope.numDeletes = 0;

        //grab the form values;

        var usernameVal = $('#usernameField').val();
        var emailVal = $('#emailField').val();
        var passwordVal = $('#PWField').val();
        var password2Val = $('#PWField2').val();

        var steamNameVal = $('#steamUsernameField').val();
        var steamPWVal = $('#steamPWField').val();

        // conditionally update the values

        $scope.currentUser.username = usernameVal === '' ? $scope.currentUser.username : usernameVal;
        $scope.currentUser.email = emailVal === '' ? $scope.currentUser.email : emailVal;
        $scope.currentUser.accounts.steam.username = steamNameVal === '' ? $scope.currentUser.accounts.steam.username : steamNameVal;
        $scope.currentUser.accounts.steam.password = steamPWVal === '' ? $scope.currentUser.accounts.steam.password : steamPWVal;

        // handle PW change
        if (passwordVal !== '' && passwordVal !== password2Val) {
            goodToGo = false;
            $scope.errorMessage += 'Passwords do not match';
        } else if (passwordVal !== '') {
            $scope.currentUser.password = passwordVal;
        } else {
            delete $scope.currentUser.password;
        }
        if (goodToGo) {
            UserService.Update($scope.currentUser).success(function(result) {

                // update localStorage
                $rootScope.globals = $cookieStore.get('globals');
                $rootScope.globals.currentUser.username = $scope.currentUser.username;
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookieStore.put('globals', $rootScope.globals, {expires: expireDate});

                clearForm();
            }).error(function(result) {
                console.log(result);
            });
        }

    };

    $scope.delete = function() {
        if ($scope.numDeletes === 1) {
            UserService.Delete($scope.currentUser._id).success(function() {
                AuthenticationService.ClearCredentials();
            });
        } else {
            $scope.numDeletes++;
            $('#deleteProfButton').removeClass('btn-warning');
            $('#deleteProfButton').addClass('btn-danger');
        }

    };

    function clearForm() {
        document.getElementById('extAccountForm').reset();
        document.getElementById('userInfoForm').reset();
    }


});
