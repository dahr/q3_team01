var express = require('express'),
    router = express.Router(),
    approvalService = require('../service/ApprovalService');

/**
 * get an array of approvals
 */
router.get('/', function (req, res) {
    approvalService.getApprovals()
        .then(
            function (data) {
                console.log('Approvals List' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                res.send(error);
            }
        );
});

/**
 * get a single approval by ID
 */
router.get('/:id', function (req, res) {
    approvalService.getApprovalsById(req.param('id'))
        .then(
            function (data) {
                console.log('Approval ' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                res.send(error);
            }
        );
});

/** add a single new server for approval
 *
 * Post Body:
 * {
 *   "name": "server5",
 *   "from": "20160917",
 *   "to": "20160917",
 *   "user": "Richard Boswell",
 *   "email": "rboswell@vmware.com"
 * }
 *
 */
router.post('/', function (req, res) {

    approvalService.addApproval(req.body)
        .then(
            function (data) {
                console.log('Saved Approval' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                res.send(error);
            }
        );

});

/**
 * delete a single approval by ID
 */
router.delete('/:id', function (req, res) {
    approvalService.deleteApprovalsById(req.param('id'))
        .then(
            function (data) {
                console.log('Approvals Deleted' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                res.send(error);
            }
        );
});


module.exports = router;