'use strict';

angular.module('app.views.servers.config',[])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            console.log('ConfigServers');

            $stateProvider.state('servers_add', {
                url: '/servers',
                controller: 'CtrlServers',
                templateUrl: 'servers/servers.add.tpl.html',
                controllerAs: 'vm'
            });

        }])


;
