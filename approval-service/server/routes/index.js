var express = require('express')
    , router = express.Router();

router.use('/approvables', require('./approval'));

router.get('/', function(req, res) {
    res.send('Some basic version info');
});

router.get('/about', function(req, res) {
    res.send('Add something about the Approval-Service here');
});
module.exports = router;