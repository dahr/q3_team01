var express = require('express'),
    Promise = require('promise'),
    request = require('request'),
    config = require('../Config'),
    jsonUtils = require('./JsonUtils'),
    errorHandler = require('./ErrorHandler'),
    Approval = require('../models/Approval');

// for documentation on the appproval service used to store the approvals for the servers:
/// http://approval.vmwaredevops.appspot.com/swagger/index.html
var Approvalservice = {

    urlBase: config.url.approval,
    urlTeam: config.url.approval + config.teamParam,

    /**
     * Get all the approvals in an array
     * @returns {*}
     */
    getApprovals: function () {
        var options = {
            url: this.urlTeam,
            method: 'GET'
        };

        return new Promise(function (resolve, reject) {

            request(options, function (error, response, body) {

                if (errorHandler.hasErrors(options, error, response)) {
                    console.log('Error:' + error);
                    return reject(error);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    console.log('Error:' + parsedResponse.error);
                    return reject(parsedResponse.error);
                }

                resolve(parsedResponse.data);
            });
        });
    },

    /**
     * Gets a single approval by ID
     * @param approvalId
     * @returns {*}
     */
    getApprovalsById: function (approvalId) {
        var options = {
            url: this.urlBase + '/' + approvalId + config.teamParam,
            method: 'GET'
        };

        return new Promise(function (resolve, reject) {

            request(options, function (error, response, body) {

                if (errorHandler.hasErrors(options, error, response)) {
                    console.log('Error:' + error);
                    return reject(error);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    console.log('Error:' + parsedResponse.error);
                    return reject(parsedResponse.error);
                }

                resolve(parsedResponse.data);
            });
        });
    },

    /** add a single new server for approval
     *
     * Post Body:
     * {
     *   "name": "server5",
     *   "from": "20160917",
     *   "to": "20160917",
     *   "user": "Richard Boswell",
     *   "email": "rboswell@vmware.com"
     * }
     *
     * @param serverInfo
     * @returns {*}
     */
    addApproval: function (serverInfo) {

        var newApproval = new Approval();
        newApproval.description = JSON.stringify(serverInfo);

        var options = {
            url: this.urlBase,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newApproval)
        };

        return new Promise(function (resolve, reject) {

            request.post(options, function (error, response, body) {

                if (errorHandler.hasErrors(options, error, response)) {
                    console.log('Error:' + error);
                    return reject(error);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    console.log('Error:' + parsedResponse.error);
                    return reject(parsedResponse.error);
                }

                resolve(parsedResponse.data);
            });
        });
    },

    /**
     * Delete a single approval by ID
     *
     * @param approvalId
     * @returns {*}
     */
    deleteApprovalsById: function (approvalId) {
        var options = {
            url: this.urlBase + '/' + approvalId,
            method: 'DELETE'
        };

        return new Promise(function (resolve, reject) {

            request.delete(options, function (error, response, body) {

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


module.exports = Approvalservice;