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

module.exports = router;