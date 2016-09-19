var express = require('express'),
    router = express.Router(),
    approvalService = require('../service/approvalService'),
    ApprovablesResponseException = require('../models/approvables/ApprovablesResponseException'),
    ApprovalRequestException = require('../models/approval/ApprovalRequestException'),
    ApprovalRequest = require('../models/approval/ApprovalRequest');

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
                return res.status(500).send(error);
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
                return res.status(500).send(error);
            }
        );

});

/** add a single new server for approval
 *
 * Post Body:
 * {
 *   "name": "server5",
 *   "date": "20160917",
 *   "user": "Richard Boswell",
 *   "email": "rboswell@vmware.com"
 * }
 *
 */
router.post('/', function (req, res) {

    try {
        var approvalRequest = new ApprovalRequest(req.body);

        approvalService.addApproval(approvalRequest)
            .then(
                function (data) {
                    console.log('Saved Approval' + JSON.stringify(data));
                    res.send(data);
                },
                function (error) {
                    return res.status(500).send(error);
                }
            );

    } catch (exception) {
        if (exception instanceof ApprovalRequestException) {
            return res.status(400).send(exception);
        } else {
            console.log('Unknown Error:' + exception);
            return res.status(500).send(exception);

        }

    }
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
                return res.status(500).send(error);
            }
        );
});


module.exports = router;