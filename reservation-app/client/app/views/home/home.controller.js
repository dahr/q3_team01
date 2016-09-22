'use strict';

angular.module('app.views.home.controller', [
    'app.services.reservationservice'
])

    .controller('CtrlHome', ['$scope', 'ReservationService',
        function ($scope, ReservationService) {

            console.log('CtrlHome');

            var vm = this;

            ///////////////////////////////////////
            var loadData = function(){

                ReservationService.getReservations()
                    .then(function (data) {
                        vm.data = data;
                    });
            };

            ///////////////////////////////////////
            function initHome(){
              loadData();
            }

            initHome();

        }])


;
