'use strict';

angular.module('reservation-app', [
    'app.templates',
    'ui.router',
    'ngMaterial',
    'ngMdIcons',
    'app.views.schedule',
    'app.views.servers',
    'app.views.login'
])

/////////////////////////////////////////////////////////////////////////
// setup page routing options
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
            console.log('Setting up App config');

            // set default page
            $urlRouterProvider.otherwise('/login');
            $locationProvider.hashPrefix('!');

            // set http configs
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
            $httpProvider.defaults.headers.common["Accept"] = "application/json";
            $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

            // set theme
            var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['50'],
                '50': 'ffffff'
            });
            $mdThemingProvider.definePalette('customBlue', customBlueMap);
            $mdThemingProvider.theme('default')
                .primaryPalette('customBlue', {
                    'default': '500',
                    'hue-1': '50'
                })
                .accentPalette('pink');

            $mdThemingProvider.theme('input', 'default')
                .primaryPalette('grey')

        }])

    /////////////////////////////////////////////////////////////////////////
    // setup root scope variables
    .run(['$rootScope', '$http', function ($rootScope, $http) {
        $rootScope.BUILDINFO = {
            name: 'reservation-app',
            version: '0.0.1'
        };
        $rootScope.user = null;


        // add App-Id to all requests
        $http.defaults.headers.common['App-Id'] = $rootScope.BUILDINFO.name;
        $http.defaults.headers.common['App-Version'] = $rootScope.BUILDINFO.version;
    }])

    /////////////////////////////////////////////////////////////////////////
    .controller('CtrlApp', ['$scope', '$rootScope', '$state', '$mdSidenav',
        function ($scope, $rootScope, $state, $mdSidenav) {

            /////////////////////////////////////////////////////////////////////////
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if ('data' in toState && angular.isDefined(toState.results.pageTitle)) {
                    $scope.pageTitle = $rootScope.appName + ' : ' + toState.results.pageTitle;
                    document.title = $scope.pageTitle;
                }
            });

            /////////////////////////////////////////////////////////////////////////
            $scope.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();

            };

            /////////////////////////////////////////////////////////////////////////
            $scope.hideSidenav = function (menuId) {
                if ($mdSidenav(menuId).isOpen()) {
                    $scope.toggleSidenav(menuId);
                }
            };

            /////////////////////////////////////////////////////////////////////////
            $scope.goToState = function (state) {
                $state.go(state);
                //$scope.toggleSidenav('left');

            };

            /////////////////////////////////////////////////////////////////////////
            $scope.checkLogin = function () {

                if ($rootScope.user === null) {
                    $state.go('login');
                }

            };

            /////////////////////////////////////////////////////////////////////////
            $scope.getUserName = function () {
                if ($rootScope.user) {
                    return $rootScope.user.name;
                }
            };


            /////////////////////////////////////////////////////////////////////////
            $scope.getUserEmail = function () {
                if ($rootScope.user) {
                    return $rootScope.user.email;
                }
            };


            /////////////////////////////////////////////////////////////////////////
            $scope.logoutUser = function () {
                $rootScope.user = null;
                $state.go('login');
                $scope.toggleSidenav('right');
            };

        }]
    ); // controller_end

