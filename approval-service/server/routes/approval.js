var express = require('express'),
    router = express.Router(),
    approvalService = require('../service/ApprovalService');

router.get('/', function (req, res) {
    approvalService.getApprovals()
        .then(
            function(data){
                console.log('Approvals Content' + JSON.stringify(data));
                res.send(data);
            },
            function(error){
                res.send(error);
            }
        );
});

router.get('/:id', function (req, res) {
    approvalService.getApprovalsById(req.param('id'))
        .then(
            function(data){
                console.log('Approvals Content' + JSON.stringify(data));
                res.send(data);
            },
            function(error){
                res.send(error);
            }
        );
});


router.post('/', function (req, res) {

    res.send('ok');


});

module.exports = router;