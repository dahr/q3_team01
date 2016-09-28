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

