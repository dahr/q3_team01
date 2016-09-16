var express = require('express'),
    Promise = require('promise'),
    request = require('request'),
    config = require('../Config'),
    jsonUtils = require('./JsonUtils'),
    errorHandler = require('./ErrorHandler'),
    Blob = require('../models/Blob');

// for documentation on the blob service used to store the servers for the lab:
// http://blobs.vmwaredevops.appspot.com/swagger/index.html#/

var BlobService = {

    urlBase: config.url.blobs,
    urlTeam: config.url.blobs + '/' + config.teamNumber,


    /**
     * Calls the blob service to get a data block of server information
     *
     * @returns {*} parsed and processed json array with all the server information
     */
    getServers: function () {

        var options = {
            url: this.urlTeam,
            method: 'GET'
        };

        return new Promise(function (resolve, reject) {

            request(options, function (error, response, body) {

                if (errorHandler.hasErrors(options, error, response)) {
                    console.log('Error:'+ error);
                    return reject(error);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    console.log('Error:'+ parsedResponse.error);
                    return reject(parsedResponse.error);
                }

                resolve(parsedResponse.data);
            });
        });
    },


    /**
     * adds a new server to the blob service
     * @param serverData
     */
    addServer: function (currentData, newServer) {

        var newBlob = new Blob();
        newBlob.clone(currentData);
        newBlob.addServer(newServer);

        var options = {
            url: this.urlBase,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBlob)
        };

        return new Promise(function (resolve, reject) {

            request.post(options, function (error, response, body) {

                if (errorHandler.hasErrors(options, error, response)) {
                    console.log('Error:'+ error);
                    return reject(error);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    console.log('Error:'+ parsedResponse.error);
                    return reject(parsedResponse.error);
                }

                resolve(parsedResponse.data);
            });

        });


    }

};


module.exports = BlobService;