var jsonUtils = require('../../service/util/JsonUtils'),
    ApprovalRequestException = require('./ApprovalRequestException');


var approvalRequestValidator = {


    validate: function (approvalRequest) {

        var errorList = [];
        if (!approvalRequest.name) {
            errorList.push('Missing ServerName');
        }

        if (!approvalRequest.date) {
            errorList.push('Missing Date');
        }

        // if we have a date, check the format
        if (approvalRequest.date) {

            if (!jsonUtils.validDate(approvalRequest.date)) {
                errorList.push('Incorrect Date Format-' + approvalRequest.date);
            }
        }

        if (!approvalRequest.user) {
            errorList.push('Missing User');
        }

        if (!approvalRequest.email) {
            errorList.push('Missing E-Mail');
        }

        if (errorList.length) {
            throw new ApprovalRequestException(errorList);

        }
    }


};


module.exports = approvalRequestValidator;