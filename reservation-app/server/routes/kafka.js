var express = require('express'),
    router = express.Router(),
    messagingService = require('../service/messagingService');


// TODO: simple endpoint to test the sending of message to kafka
// delete this and the index.js entry once we have the journaling stuff working
// call it with api/kafka/{message} and you should see the parm in the consumer
router.get('/:message', function (req, res) {

    messagingService.postMessage('test', req.param('message'))
        .then(
            function (data) {
                return res.send(data);
            },
            function (error) {
                res.status(500).send(error);
            });

});

module.exports = router;