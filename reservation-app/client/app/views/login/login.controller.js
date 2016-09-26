'use strict';

angular.module('app.views.login.controller', [])
    .controller('CtrlLogin', ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            var vm = this;
            vm.user = {name: '', email:''};


            vm.loginUser = function (isValid) {
                if(isValid){
                    $scope.goToState('schedule_list');
                    $rootScope.user = vm.user;
                    $scope.hideSidenav('left');
                    $scope.hideSidenav('right');
                }
            };


        }]); // controller_end
