var express = require('express'),
    router = express.Router(),
    serversService = require('../service/serversService');


router.get('/', function (req, res) {
    res.send('OK');
});

router.post('/', function (req, res) {

    serversService.postServer(req.body)
        .then(
            function (data) {
                console.log('Server List' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                return res.status(500).send(error.res.body);
            }
        );
});

module.exports = router;