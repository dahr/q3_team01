var Promise = require('promise'),
    request = require('request'),
    jsonUtils = require('./util/JsonUtils'),
    errorHandler = require('./util/errorHandler'),
    config = require('../Config');


var servers = {

    urlBase: config.url.serverService,

    postServer: function (newServer) {

        console.log(JSON.stringify(newServer));

        var options = {
            url: this.urlBase,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newServer)
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

                var returnServer={};
                // only return the new matching server from the response
                parsedResponse.data.forEach(function(server){
                    if(newServer.name === server.name){
                        returnServer = server;
                    }
                });

                resolve(returnServer);
            });

        });

    },

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