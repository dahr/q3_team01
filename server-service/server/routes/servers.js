var express = require('express'),
    router = express.Router(),
    blobService = require('../service/BlobService'),
    Server = require('../models/server/Server'),
    ServerRequestException = require('../models/server/ServerRequestException'),
    ServerDuplicateRequestException = require('../models/server/ServerRequestDuplicateException'),
    ServerRequestNotFoundException = require('../models/server/ServerRequestNotFoundException');

/**
 * Returns an array of all the servers that are configured for the lab
 */
router.get('/', function (req, res) {

    blobService.getServers()
        .then(
            function (blob) {

                console.log('Lab Content' + JSON.stringify(blob));
                res.send(blob.content);
            },
            function (error) {
                return res.status(500).send(error);
            }
        );

});

/**
 * Adds a server to the lab data
 *
 * {
 *   "name": "server2",  // mandatory
 *   "description": "Another server"  // this and other info is optional
 * }
 */
router.post('/', function (req, res) {

    // get the server data for the current labs
    blobService.getServers()
        .then(
            function (currentData) {
                try {

                    var server = new Server(req.body);

                    // then add the new server
                    blobService.addServer(currentData, server)
                        .then(
                            function (blob) {
                                console.log('Saved Lab Content' + JSON.stringify(blob));
                                res.send(blob.content);
                            },
                            function (error) {
                                return res.status(500).send(error+req.body);
                            }
                        );

                } catch (e) {
                    if (e instanceof ServerRequestException) {
                        return res.status(400).send(e);
                    } else if (e instanceof ServerDuplicateRequestException) {
                        return res.status(400).send(e);
                    } else {
                        console.log('Unknown Error:' + e);
                        return res.status(500).send(e);
                    }

                }

            },
            function (error) {
                return res.status(500).send(error);
            }
        );


});

/**
 * Delete a server from the lab server list
 *
 * the servername is passed on the URL
 */
router.delete('/:name', function (req, res) {

    // get the server data for the current labs
    blobService.getServers()
        .then(
            function (currentData) {
                try {

                    // then delete the server
                    blobService.deleteServerByName(currentData, req.param('name'))
                        .then(
                            function (blob) {
                                console.log('Lab Content after Delete' + JSON.stringify(blob));
                                res.send(blob.content);
                            },
                            function (error) {
                                return res.status(500).send(error);
                            }
                        );

                } catch (e) {
                    if (e instanceof ServerRequestException) {
                        return res.status(400).send(e);
                    } else if (e instanceof ServerRequestNotFoundException) {
                        return res.status(400).send(e);
                    } else {
                        console.log('Unknown Error:' + e);
                        return res.status(500).send(e);
                    }

                }

            },
            function (error) {
                return res.status(500).send(error);
            }
        );


});


module.exports = router;