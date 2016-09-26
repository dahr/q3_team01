'use strict';

angular.module('app.views.login.config', [])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login/login.tpl.html',
            controller: 'CtrlLogin',
            controllerAs: 'vm'
        });


    }]); // end config
