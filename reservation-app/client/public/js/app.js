!function(){
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


}();
!function(){
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

}();
!function(){
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

}();
!function(){
'use strict';

angular.module('app.views.servers', [
    'app.views.servers.config',
    'app.views.servers.controller'

])

;

}();
!function(){
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

}();
!function(){
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

}();
!function(){
'use strict';

angular.module('app.views.login', [
    'app.views.login.config',
    'app.views.login.controller'

])

;

}();
!function(){
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

}();
!function(){
'use strict';

angular.module('app.views.schedule.controller', [
    'angularMoment',
    'ui.grid',
    'app.services.reservations'
])

    .controller('CtrlSchedule', ['$scope', '$timeout', 'ReservationsService', 'moment', '$mdDialog',
        function ($scope, $timeout, ReservationsService, moment, $mdDialog) {

            console.log('CtrlSchedule');

            var vm = this;
            vm.data = [];

            $scope.checkLogin();

            $scope.showConfirm = function (ev, reservation) {
                var msg = reservation.server_name +
                    ' for ' + $scope.getUserName() +
                    ' on ' + reservation.start_date;


                var confirm = $mdDialog.confirm()
                    .title('Would you like to create this reservation?')
                    .textContent(msg)
                    .ariaLabel('Reserve Server')
                    .targetEvent(ev)
                    .ok('Of course')
                    .cancel('Some other day');

                $mdDialog.show(confirm).then(function () {
                    createReservation(reservation);
                });
            };

            ///////////////////////////////////////
            vm.onClickDay = function (server, day) {

                var serverInfo = server.name + ', ' + server.description + ', ';
                if (day.approval) {
                    alert(serverInfo + ' Is already booked by\n' +
                        day.approval.user + ' (' + day.approval.email + ')' +
                        ' on ' + day.date);

                } else {
                    var reservation =
                    {
                        server_name: server.name,
                        start_date: day.raw.format('YYYYMMDD'),
                        end_date: day.raw.format('YYYYMMDD'),
                        name: $scope.getUserName(),
                        email: $scope.getUserEmail()
                    };

                    $scope.showConfirm(null, reservation);
                }
            };

            ///////////////////////////////////////
            vm.onClickMonthPrevious = function(){
                alert('TODO: add prev month');
            };

            ///////////////////////////////////////
            vm.onClickMonthNext = function(){
                alert('TODO: add next month');
            };
            ///////////////////////////////////////
            vm.onClickRefresh = function(){
                loadData();
            };

            ///////////////////////////////////////
            var loadData = function () {

                ReservationsService.getReservations()
                    .then(function (data) {

                        data.forEach(function (server) {
                            server.month = getDaysArrayByMonth();
                            server.month.days.forEach(function (day) {

                                server.approvalList.forEach(function (approval) {
                                    if (day.raw.format('YYYYMMDD') === approval.description.date) {
                                        day.approval = approval.description;
                                        day.approval.approved = approval.approved ? 'APPROVED': 'PENDING';
                                    }
                                });

                            });

                            delete server.approvalList;
                        });

                        vm.data = data;
                    });
            };


            ///////////////////////////////////////
            function getDaysArrayByMonth() {
                var now = moment();
                var daysInMonth = now.daysInMonth();
                var month = {};
                month.days = [];

                month.text = now.format('MMMM');
                month.number = now.format('M');

                var formatL = moment.localeData().longDateFormat('L');

                for (var idx = 1; idx <= daysInMonth; idx++) {
                    var day = moment().date(idx);
                    month.days.push({
                        idx: idx,
                        raw: day,
                        date: day.format(formatL)
                    });
                }

                return month;
            }


            ///////////////////////////////////////
            function createReservation(reservation) {
                ReservationsService.createReservation(reservation)
                    .then(function(){
                        loadData();
                    })
            }


            ///////////////////////////////////////
            function initSchedule() {
                loadData();
            }

            $timeout(initSchedule);

        }])


;

}();
!function(){
'use strict';

angular.module('app.views.schedule', [
    'app.views.schedule.config',
    'app.views.schedule.controller'

])

;

}();
!function(){
'use strict';

angular.module('app.services.reservations', [])
    .service('ReservationsService', function ($http) {

        this.getReservations = function () {

            return $http.get('/api/reservations')
                .then(function (response) {
                    return response.data;
                });
        };

        this.createReservation = function (reservation) {

            return $http.post('/api/reservations', reservation)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (error) {
                        return error;
                    });
        };

    });


}();
!function(){
'use strict';

angular.module('app.services.servers', [])
    .service('ServersService', function ($http) {

        this.postServer = function (server) {

            return $http.post('/api/servers', server)
                .then(
                    function (response) {
                        return response.data;
                    });
        };

    });


}();