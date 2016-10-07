var jsonUtils = require('../../service/util/JsonUtils'),
    ApprovalRequestException = require('./ApprovalRequestException');


var approvalRequestValidator = {


    validate: function (approvalRequest) {

        var errorList = [];
        if (!approvalRequest.name) {
            errorList.push('Missing Server name');
        }

        if (!approvalRequest.date) {
            errorList.push('Missing date');
        }

        // if we have a date, check the format
        if (approvalRequest.date) {

            if (!jsonUtils.validDate(approvalRequest.date)) {
                errorList.push('Incorrect Date Format-' + approvalRequest.date);
            }
        }

        if (!approvalRequest.user) {
            errorList.push('Missing user');
        }

        if (!approvalRequest.email) {
            errorList.push('Missing email');
        }

        if (errorList.length) {
            throw new ApprovalRequestException(errorList);

        }
    }


};


module.exports = approvalRequestValidator;