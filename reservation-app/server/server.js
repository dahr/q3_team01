var express = require('express');
var path = require('path');

var app = express();
app.use('/app/nea', express.static(path.join(__dirname, '../public'))); //  "public" off of current is root

app.use('/api/nea', require('./routes'));


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Running from: %s", __dirname);
    console.log("Example app listening at http://%s:%s", host, port)

});