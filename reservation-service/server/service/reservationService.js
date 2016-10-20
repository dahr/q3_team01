var express = require('express'),
    Promise = require('promise'),
    request = require('request'),
    moment = require('moment'),
    jsonUtils = require('./util/JsonUtils'),
    errorHandler = require('./util/errorHandler'),
    config = require('../Config');


var reservation = {


    urlServers: config.url.serverService,
    urlApprovals: config.url.approvalService,
    urlTeam: config.url.approval + config.teamParam,

    /**
     * Get all the reservations in an array
     * Filer by id if passed
     * @returns {*}
     */
    getReservations: function (id, date) {
        _self = this;

        return new Promise(function (resolve, reject) {
            _self.getServers()
                .then(function (serverList) {
                    _self.getApprovals(date)
                        .then(function (approvalList) {
                            _self.calculateApprovedServers(serverList, approvalList, id)
                                .then(function (approvedServers) {
                                    resolve(approvedServers);

                                });
                        })
                });

        });

    },

    calculateApprovedServers: function (serverList, approvalList, approvalId) {
        return new Promise(function (resolve, reject) {

            serverList.forEach(function (server) {
                console.log('Processing Server:' + JSON.stringify(server));

                server.approvalList = [];
                approvalList.forEach(function (approval) {

                    if (server.name === approval.description.name) {
                        server.approvalList.push(approval);

                        if (approvalId && approval.id === parseInt(approvalId)) {
                            // Find and return the only server/approval by id
                            return resolve([server]);
                        }
                    }
                })
            });

            resolve(serverList);
        })
    },

    getApprovals: function (date) {
        var options = {
            url: this.urlApprovals,
            method: 'GET'
        };

        return new Promise(function (resolve, reject) {

            request.get(options.url, {qs: {date: date }}, function (error, response, body) {
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

    getServers: function () {
        var options = {
            url: this.urlServers,
            method: 'GET'
        };

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



    convertReservationToApproval: function (newReservation) {
        var resDate = moment(newReservation.start_date);
        return {
            "name": newReservation.server_name,
            "date": resDate.format('YYYYMMDD'),
            "user": newReservation.name,
            "email": newReservation.name + '@' + 'test.net'
        };
    },

    /**
     * Convert a reservation and send to the approval service
     */
    createReservation: function (reservation) {

        var approval = this.convertReservationToApproval(reservation);

        var options = {
            url: this.urlApprovals,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(approval)
        };

        return new Promise(function (resolve, reject) {

            request.post(options, function (error, response, body) {

                var errorsFound = errorHandler.hasErrors(options, error, response);
                if (errorsFound) {
                    return reject(errorsFound);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    return reject(parsedResponse.error);
                }

                //parsedResponse.data.description = jsonUtils.parseEncodedString(parsedResponse.data.description);

                resolve(parsedResponse.data);
            });
        });
    }

};


module.exports = reservation;