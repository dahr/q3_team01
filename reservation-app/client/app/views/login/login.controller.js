'use strict';

angular.module('app.views.login.controller', [])
    .controller('CtrlLogin', ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            var vm = this;

            vm.loginUser = function () {
                $scope.goToState('home');
                $rootScope.user = {name: 'user1', email: 'user1@gmail.com'};
                $scope.hideSidenav('left');
                $scope.hideSidenav('right');

            }

        }]); // controller_end
