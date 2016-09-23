var express = require('express'),
    Promise = require('promise'),
    request = require('request'),
    jsonUtils = require('./util/JsonUtils'),
    errorHandler = require('./util/errorHandler'),
    config = require('../Config');


var reservation = {


    urlServers: config.url.serverService,
    urlApprovals: config.url.approvalService,
    urlTeam: config.url.approval + config.teamParam,

    /**
     * Get all the reservations in an array
     * @returns {*}
     */
    getReservations: function () {
        _self = this;

        return new Promise(function (resolve, reject) {
            _self.getServers()
                .then(function(serverList){
                    _self.getApprovals()
                        .then(function(approvalList){
                            _self.calculateApprovedServers(serverList, approvalList)
                                .then(function(approvedServers){
                                    resolve(approvedServers);

                                });
                        })
                });

            });

    },

    calculateApprovedServers: function(serverList, approvalList){
        return new Promise(function (resolve, reject) {

            serverList.forEach(function(server){
               console.log('Processing Server:' + JSON.stringify(server));
                server.approvalList = [];
                approvalList.forEach(function (approval) {
                    if(server.name === approval.description.name){
                        server.approvalList.push(approval);
                    }
                })
            });

            resolve(serverList);
        })
    },

    getApprovals: function(){
        var options = {
            url: this.urlApprovals,
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


    /**
     * Send a reservation to the approval queue
     */
    createReservation: function (reservation) {

        return new Promise(function (resolve, reject) {
            resolve("Reservation Sent to Queue");
        })
    }

};


module.exports = reservation;