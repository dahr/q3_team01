var Promise = require('promise'),
    request = require('request'),
    jsonUtils = require('./util/JsonUtils'),
    errorHandler = require('./util/errorHandler'),
    config = require('../Config'),
    messagingService = require('../service/messagingService');



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
    },



    /**
     * Create a new reservation by calling the reservation service
     * TODO: this only processes one day right now, the start_date
     */
    postReservation: function (newReservation) {

        console.log(JSON.stringify(newReservation));

        // TODO: this message call will replace the http request below
        return messagingService.postMessage(config.TOPIC_RESERVATION_REQUEST, JSON.stringify(newReservation));

        // var options = {
        //     url: this.urlBase,
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newReservation)
        // };
        //
        // return new Promise(function (resolve, reject) {
        //
        //     request.post(options, function (error, response, body) {
        //
        //         var errorsFound = errorHandler.hasErrors(options, error, response);
        //         if (errorsFound) {
        //             return reject(errorsFound);
        //         }
        //
        //         var parsedResponse = jsonUtils.parseResponseBody(options, body);
        //         if (parsedResponse.error) {
        //             return reject(parsedResponse.error);
        //         }
        //
        //
        //         resolve(parsedResponse.data);
        //     });
        //
        // });

    }


};


module.exports = reservation;