var express = require('express')
    , router = express.Router();

router.use('/reservations', require('./reservations'));

router.get('/', function(req, res) {
    res.send('Some basic version info');
});

router.get('/about', function(req, res) {
    res.send('Add something about the Reservation-Service here');
});
module.exports = router;