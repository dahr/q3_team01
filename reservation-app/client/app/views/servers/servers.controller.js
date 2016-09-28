'use strict';

angular.module('app.views.servers.controller', [
    'angularMoment',
    'ui.grid',
    'app.services.servers'
])

    .controller('CtrlServers', ['$scope', '$timeout', 'ServersService', 'moment',
        function ($scope, $timeout, ServersService, moment) {

            console.log('CtrlServers');

            var vm = this;
            vm.server = {name: '', description:''};
            vm.errors = [];

            $scope.checkLogin();


            ///////////////////////////////////////
            vm.addServer = function (isValid) {
                if(isValid){
                    saveServer(vm.server)
                        .then(function(){
                            $scope.goToState('schedule_list');
                        }, function(error){
                            vm.errors.push(error);
                        });
                }
            };

            ///////////////////////////////////////
            function saveServer(server){
                console.log("Saving..." + JSON.stringify(server));
                return ServersService.postServer(server);
            }

            ///////////////////////////////////////
            function initServers() {
            }

            $timeout(initServers);

        }])


;
