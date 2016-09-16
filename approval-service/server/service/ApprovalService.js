var express = require('express'),
    Promise = require('promise'),
    request = require('request'),
    config = require('../Config'),
    jsonUtils = require('./JsonUtils'),
    errorHandler = require('./ErrorHandler'),
    Blob = require('../models/Approval');

// for documentation on the appproval service used to store the approvals for the servers:
/// http://approval.vmwaredevops.appspot.com/swagger/index.html
var Approvalervice = {

    urlBase: config.url.blobs,
    urlTeam: config.url.blobs + '/' + config.teamNumber,


};


module.exports = Approvalervice;