'use strict';

angular.module('app.services.reservationservice', [])
    .service('ReservationService', function($http){

    this.getReservations = function() {

        return $http.get('/api/reservations').then(function(response) {
            return response.data;
        });
    };

});

