'use strict';

angular.module('app.views.schedule.config',[])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            console.log('ConfigSchedule');

            $stateProvider.state('schedule_list', {
                url: '/schedules',
                controller: 'CtrlSchedule',
                templateUrl: 'schedule/schedule.list.tpl.html',
                controllerAs: 'vm'
            });

        }])


;
