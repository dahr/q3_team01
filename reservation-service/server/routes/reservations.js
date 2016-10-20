var express = require('express'),
    router = express.Router(),
    Reservation = require('../models/reservation/Reservation'),
    ReservationRequestException = require('../models/reservation/ReservationRequestException'),
    reservationService = require('../service/reservationService');

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
 * get a reservation by ID, in an array
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

/**
 * create a reservation
 */
router.post('/', function (req, res) {

    try{
        var reservation = new Reservation(req.body);

        reservationService.createReservation(reservation)
            .then(
                function (data) {
                    console.log('Created Reservation ' + JSON.stringify(data));
                    res.send(data);
                },
                function (error) {
                    return res.status(error.res.statusCode).send(error);
                }
            );

    } catch (e) {
        if (e instanceof ReservationRequestException) {
            return res.status(400).send(e);
        } else {
            console.log('Unknown Error:' + e);
            return res.status(500).send(e);
        }

    }


});



module.exports = router;