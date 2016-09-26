'use strict';

angular.module('app.views.home.config',[])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            console.log('ConfigHome');

            $stateProvider.state('home', {
                url: '/home',
                controller: 'CtrlHome',
                templateUrl: 'home/home.tpl.html',
                controllerAs: 'vm'
            });

        }])


;
