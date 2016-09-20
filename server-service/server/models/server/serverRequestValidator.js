var ServerRequestException = require('./ServerRequestException');

var serverRequestValidator = {

    validate: function (server) {

        var errorList = [];
        if (!server.name) {
            errorList.push('Missing ServerName');
        }

        if (errorList.length) {
            throw new ServerRequestException(errorList);
        }

    }


};


module.exports = serverRequestValidator;