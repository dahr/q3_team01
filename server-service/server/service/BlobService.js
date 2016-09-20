var express = require('express'),
    Promise = require('promise'),
    request = require('request'),
    config = require('../Config'),
    jsonUtils = require('./util/JsonUtils'),
    errorHandler = require('./util/ErrorHandler'),
    Blob = require('../models/blob/Blob');

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

                var errorsFound = errorHandler.hasErrors(options, error, response);
                if (errorsFound) {
                    return reject(errorsFound);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    return reject(parsedResponse.error);
                }

                // convert string content to json ojbect
                parsedResponse.data.content = jsonUtils.parseEncodedString(parsedResponse.data.content);

                resolve(parsedResponse.data);
            });
        });
    },


    /**
     * Adds a new new server to the blob lab list
     * checks for duplicates
     *
     * @param currentData
     * @param newServer
     * @returns {*}
     */

    addServer: function (currentData, newServer) {

        var newBlob = new Blob();
        newBlob.clone(currentData);
        newBlob.addServer(newServer);

        // set content to string before saving
        newBlob.content = JSON.stringify(newBlob.content);

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

                var errorsFound = errorHandler.hasErrors(options, error, response);
                if (errorsFound) {
                    return reject(errorsFound);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    return reject(parsedResponse.error);
                }

                // convert string content to json ojbect
                parsedResponse.data.content = jsonUtils.parseEncodedString(parsedResponse.data.content);

                resolve(parsedResponse.data);
            });

        });


    }

};


module.exports = BlobService;