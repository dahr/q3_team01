var express = require('express'),
    Promise = require('promise'),
    request = require('request'),
    config = require('../Config'),
    jsonUtils = require('./JsonUtils'),
    errorHandler = require('./ErrorHandler'),
    Blob = require('../models/Approval');

// for documentation on the appproval service used to store the approvals for the servers:
/// http://approval.vmwaredevops.appspot.com/swagger/index.html
var Approvalservice = {

    urlBase: config.url.approval,
    urlTeam: config.url.approval + config.teamParam,

    getApprovals: function(){
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
    }

};


module.exports = Approvalservice;