var express = require('express')
    , router = express.Router();

router.use('/reservations', require('./reservations'));
router.use('/servers', require('./servers'));
// TODO this is a test - delete kafka
router.use('/kafka', require('./kafka'));

router.get('/', function(req, res) {
    res.send('Some basic version info');
});

router.get('/about', function(req, res) {
    res.send('Something about us');
});
module.exports = router;