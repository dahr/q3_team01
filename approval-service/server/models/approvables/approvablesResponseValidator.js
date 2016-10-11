var jsonUtils = require('../../service/util/JsonUtils'),
    ApprovablesResponseException = require('./ApprovablesResponseException');


var approvablesResponseValidator = {


    validate: function (approvablesResponse) {

        var errorList = [];
        if (!approvablesResponse.id) {
            errorList.push('Missing id');
        }
        if (!approvablesResponse.teamID) {
            errorList.push('Missing teamID');
        }
        if (!approvablesResponse.blob) {
            errorList.push('Missing blob');
        }
        if (!approvablesResponse.description) {
            errorList.push('Missing description');
        } else {
            if (!approvablesResponse.description.name) {
                errorList.push('Missing description name');
            }
            if (!approvablesResponse.description.date) {
                errorList.push('Missing description date');
            }
            if (!approvablesResponse.description.user) {
                errorList.push('Missing description user');
            }
            if (!approvablesResponse.description.email) {
                errorList.push('Missing description email');
            }

        }


        if (!approvablesResponse.approved) {
            errorList.push('Missing approved');
        }

        if (errorList.length) {
            throw new ApprovablesResponseException(errorList);

        }
    }


};


module.exports = approvablesResponseValidator;