'use strict';

/**
 * @ngdoc service
 * @name nea.services.sampledata:SampleDataService
 *
 * @description
 *
 *
 * */
angular.module('nea.services.sampledata', [])
    .service('SampleDataService', function($http){

    this.getSampleData = function() {

        return $http.get('/api/reservations').then(function(response) {
            return response.data;
        });
    };

});

