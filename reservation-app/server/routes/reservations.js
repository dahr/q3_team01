var express = require('express'),
    router = express.Router(),
    reservationService = require('../service/reservationService');



/**
 * get an array of reservations
 */
router.get('/', function (req, res) {

    reservationService.getReservations()
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

    reservationService.getReservations(req.param('id'))
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

    reservationService.postReservation(req.body)
        .then(
            function (data) {
                console.log('New Reservation' + JSON.stringify(data));
                res.send(data);
            },
            function (error) {
                return res.status(500).send(error.res.body);
            }
        );
});

module.exports = router;