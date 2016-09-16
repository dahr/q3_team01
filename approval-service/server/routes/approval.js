var express = require('express'),
    router = express.Router(),
    config = require('../Config'),
    jsonUtils = require('../service/JsonUtils'),
    approvalService = require('../service/ApprovalService');

router.get('/', function (req, res) {

    res.send('ok');

});


router.post('/', function (req, res) {

    res.send('ok');


});

module.exports = router;