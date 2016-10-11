var Promise = require('promise'),
    request = require('request'),
    jsonUtils = require('./util/JsonUtils'),
    errorHandler = require('./util/errorHandler'),
    config = require('../Config');


var servers = {

    urlBase: config.url.serverService,

    getServers: function () {

        var options = {
            url: this.urlBase
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

                resolve(parsedResponse.data);
            })

        });

    }
};


module.exports = servers;