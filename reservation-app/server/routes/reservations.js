var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    config = require('../Config'),
    reservationService = require('../service/reservationService'),
    messagingService = require('../service/messagingService');



/**
 * get an array of reservations
 */
router.get('/', function (req, res) {

    var date = req.query.date;

    reservationService.getReservations(null, date)
        .then(
            function (data) {
                console.log('Reservation List' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                return res.status(500).send(error);
            }
        );
});

/**
 * get a single reservation by ID, returned in an array
 */
router.get('/:id', function (req, res) {

    reservationService.getReservations(req.param('id'), null)
        .then(
            function (data) {
                console.log('Reservation' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                return res.status(500).send(error);
            }
        );
});


router.post('/', function (req, res) {

    var newApproval = convertReservationToApproval(req.body);

    console.log('Posting New Reservation Request:' + JSON.stringify(newApproval));

    messagingService.postMessage(config.TOPIC_APPROVAL_REQUEST, newApproval)
        .then(
            function (data) {

                newApproval.response = data;
                console.log('Finished Posting New Reservation' + JSON.stringify(newApproval));
                res.send(newApproval);
            },
            function (error) {
                console.log('ERROR Posting New Reservation:' + JSON.stringify(newApproval) + JSON.stringify(error));
                return res.status(500).send(error.res.body);
            }
        );


});

function convertReservationToApproval(newReservation) {
    var resDate = moment(newReservation.start_date);
    return {
        "name": newReservation.server_name,
        "date": resDate.format('YYYYMMDD'),
        "user": newReservation.name,
        "email": newReservation.name + '@' + 'test.net',
        "approved": false  // initialize it as false

};
}

module.exports = router;