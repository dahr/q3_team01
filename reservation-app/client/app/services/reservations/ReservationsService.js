'use strict';

angular.module('app.services.reservations', [])
    .service('ReservationsService', function($http){

    this.getReservations = function() {

        return $http.get('/api/reservations').then(function(response) {
            return response.data;
        });
    };

});

