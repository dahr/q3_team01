var express = require('express'),
    router = express.Router(),
    config = require('../Config'),
    messagingService = require('../service/messagingService'),
    serversService = require('../service/serversService');


router.get('/', function (req, res) {
    serversService.getServers()
        .then(
            function (data) {
                console.log('Server List' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                return res.status(500).send(error);
            }
        );
});

router.post('/', function (req, res) {

    var newServer = req.body;
    console.log('Posting New Server Request:' + JSON.stringify(newServer));

    messagingService.postMessage(config.TOPIC_SERVERCREATE_REQUEST, newServer)
        .then(
            function (data) {
                newServer.response = data;
                console.log('Finished Posting New Server' + JSON.stringify(data));
                res.send(newServer);
            },
            function (error) {
                console.log('ERROR Posting New Server:' + JSON.stringify(newServer) + JSON.stringify(error));
                return res.status(500).send(error.res.body);
            }
        );

});

module.exports = router;