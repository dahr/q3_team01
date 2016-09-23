'use strict';

angular.module('app.views.home.controller', [
    'angularMoment',
    'app.services.reservationservice'
])

    .controller('CtrlHome', ['$scope', 'ReservationService', 'moment',
        function ($scope, ReservationService, moment) {

            console.log('CtrlHome');

            var vm = this;


            vm.onClickDay = function(server, day){
                alert('Server:' + server.name + '\nDescription:' + server.description + "\nDate:" + day.date);
            };


            ///////////////////////////////////////
            var loadData = function(){

                ReservationService.getReservations()
                    .then(function (data) {

                        data.forEach(function(server){
                            server.month = getDaysArrayByMonth();
                            server.month.days.forEach(function(day){

                                server.approvalList.forEach(function(approval){
                                    if(day.raw.format('YYYYMMDD') === approval.description.date){
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

                for(var idx = 1; idx <= daysInMonth; idx++){
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
            function initHome(){
              loadData();
            }

            initHome();

        }])


;
