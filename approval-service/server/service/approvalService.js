var express = require('express'),
    Promise = require('promise'),
    request = require('request'),
    config = require('../Config'),
    jsonUtils = require('./util/JsonUtils'),
    errorHandler = require('./util/errorHandler'),
    ApprovablesResponseException = require('../models/approvables/ApprovablesResponseException'),
    ApprovalRequestDuplicateException = require('../models/approval/ApprovalRequestDuplicateException'),
    ParseException = require('./util/ParseException'),
    approvablesResponseValidator = require('../models/approvables/approvablesResponseValidator'),
    Approval = require('../models/approval/Approval');

// for documentation on the appproval service used to store the approvals for the servers:
/// http://approval.vmwaredevops.appspot.com/swagger/index.html
var approvalService = {

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

                var errorsFound = errorHandler.hasErrors(options, error, response);
                if (errorsFound) {
                    return reject(errorsFound);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    return reject(parsedResponse.error);
                }

                // convert the text description to json
                var convertedResponse = [];
                parsedResponse.data.forEach(function (approvalResponse) {

                        try {
                            if (approvalResponse.description) {
                                approvalResponse.description = jsonUtils.parseEncodedString(approvalResponse.description);
                            }
                            // filter out bad data
                            approvablesResponseValidator.validate(approvalResponse);
                            convertedResponse.push(approvalResponse);
                        } catch (e) {
                            if (e instanceof ApprovablesResponseException) {
                                console.log(e + '\nIgnoring Invalid Approval:' + JSON.stringify(approvalResponse));
                            } else if (e instanceof ParseException) {
                                console.log(e + '\nUnable to parse approvables payload:' + JSON.stringify(approvalResponse));
                            } else {
                                throw e;
                            }

                        }
                    }
                );

                resolve(convertedResponse);
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

                var errorsFound = errorHandler.hasErrors(options, error, response);
                if (errorsFound) {
                    return reject(errorsFound);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    return reject(parsedResponse.error);
                }

                var approvableResponse = parsedResponse.data;

                try {
                    if (approvableResponse.description) {
                        approvableResponse.description = jsonUtils.parseEncodedString(approvableResponse.description);
                    }
                    // filter out bad data
                    approvablesResponseValidator.validate(approvableResponse);
                } catch (e) {
                    if (e instanceof ApprovablesResponseException) {
                        console.log(e + '\nIgnoring Invalid Approval:' + JSON.stringify(approvableResponse));
                    } else if (e instanceof ParseException) {
                        console.log(e + '\nUnable to parse approvables payload:' + JSON.stringify(approvableResponse));
                    }
                    return reject(e);

                }

                resolve(approvableResponse);
            });
        });
    },

    /** add a single new server for approval
     *
     * Post Body:
     * {
     *   "name": "server5",
     *   "date": "20160917",
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
        newApproval.blob = parseInt(serverInfo.date);

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

                var errorsFound = errorHandler.hasErrors(options, error, response);
                if (errorsFound) {
                    return reject(errorsFound);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    return reject(parsedResponse.error);
                }

                parsedResponse.data.description = jsonUtils.parseEncodedString(parsedResponse.data.description);

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
    },



    checkForDuplicates: function (currentApprovals, serverInfo) {

        var newApproval = new Approval();
        newApproval.description = JSON.stringify(serverInfo);
        newApproval.blob = parseInt(serverInfo.date);

        currentApprovals.forEach(function (approval) {
            if (approval.blob === newApproval.blob && approval.name === newApproval.description.name) {
                var error = 'Server tst is already being used:' + JSON.stringify(approval);
                throw new ApprovalRequestDuplicateException(approval);
            }
        });

    }


};


module.exports = approvalService;