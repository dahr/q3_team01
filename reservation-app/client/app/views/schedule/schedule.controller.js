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
