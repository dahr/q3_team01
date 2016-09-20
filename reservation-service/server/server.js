var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/', require('./routes/index'));


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Running from: %s", __dirname);
    console.log("Reservation Service listening at http://%s:%s", host, port)

});