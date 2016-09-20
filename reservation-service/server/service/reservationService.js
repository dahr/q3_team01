var express = require('express'),
    Promise = require('promise'),
    request = require('request'),
    config = require('../Config');


var reservation = {

    urlBase: config.url.approval,
    urlTeam: config.url.approval + config.teamParam,

    /**
     * Get all the reservations in an array
     * @returns {*}
     */
    getReservations: function () {
        var options = {
            url: this.urlTeam,
            method: 'GET'
        };

        return new Promise(function (resolve, reject) {

            request.get(options, function (error, response, body) {

                resolve("OK");
            });
        });
    }

};


module.exports = reservation;