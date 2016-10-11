var Promise = require('promise'),
    request = require('request'),
    jsonUtils = require('./util/JsonUtils'),
    errorHandler = require('./util/errorHandler'),
    config = require('../Config');



var reservation;
reservation = {

    urlBase: config.url.reservationService,


    /**
     * Gets an array of reservations.
     * Can be filtered by the reservation id
     * @param id
     * @returns {*}
     */
    getReservations: function (id) {

        var options = {
            url: this.urlBase,
            method: 'GET'
        };

        if (id) {
            options.url = this.urlBase + '/' + id;
        }

        return new Promise(function (resolve, reject) {

            request.get(options, function (error, response, body) {

                var errorsFound = errorHandler.hasErrors(options, error, response);
                if (errorsFound) {
                    return reject(errorsFound);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    return reject(parsedResponse.error);
                }

                resolve(parsedResponse.data);
            });

        });
    }


};


module.exports = reservation;