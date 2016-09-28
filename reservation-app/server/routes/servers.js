var express = require('express'),
    router = express.Router(),
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
        );});

router.post('/', function (req, res) {

    serversService.postServer(req.body)
        .then(
            function (data) {
                console.log('Updated Server List' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                return res.status(500).send(error.res.body);
            }
        );
});

module.exports = router;