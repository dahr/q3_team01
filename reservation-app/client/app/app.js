'use strict';

angular.module('node-express-angular', [
    'app.templates',
    'ui.router',
    'ngTable',
    'nea.home'

])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            console.log('ConfigApp');

            $urlRouterProvider.otherwise('/');
            $locationProvider.hashPrefix('!');

            $stateProvider.state('root', {
                url: '/',
                controller: 'CtrlNodeExpressAngularApp',
                templateUrl: 'app.tpl.html',
                controllerAs: 'vm'
            });

        }])


    .controller('CtrlNodeExpressAngularApp', ['$scope', '$state',
        function ($scope, $state) {
            console.log('CtrlNodeExpressAngularApp');


            var vm = this;

            ///////////////////////////////////////
            vm.goHome = function(){
                alert("Go Home");
                $state.go('home');
            }

        }])


    .run(['$rootScope', function ($rootScope) {
        $rootScope.appName = 'node-express-angular';
    }])


;
