var express = require('express')
    , router = express.Router();

router.use('/servers', require('./servers'));

router.get('/', function(req, res) {
    res.send('Some basic version info');
});

router.get('/about', function(req, res) {
    res.send('Add something about the Server-Service here');
});
module.exports = router;