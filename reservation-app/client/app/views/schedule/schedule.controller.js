'use strict';

angular.module('app.views.schedule.controller', [
    'angularMoment',
    'ui.grid',
    'app.services.reservations'
])

    .controller('CtrlSchedule', ['$scope', '$timeout', 'ReservationsService', 'moment',
        function ($scope, $timeout, ReservationsService, moment) {

            console.log('CtrlSchedule');

            var vm = this;
            vm.data = [];

            $scope.checkLogin();

            ///////////////////////////////////////
            vm.onClickDay = function (server, day) {

                var serverInfo = server.name + ', ' + server.description + ', ';
                if(day.approval){
                    alert(serverInfo + ' Is already booked by\n' +
                        day.approval.user + ' (' + day.approval.email + ')' +
                    ' on ' + day.date);

                }else{
                    alert(serverInfo + ' is available on ' + day.date);

                }
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
            function initSchedule() {
                loadData();
            }

            $timeout(initSchedule);

        }])


;
