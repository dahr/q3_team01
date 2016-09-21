var express = require('express');
var path = require('path');

var app = express();
app.use('/app', express.static(path.join(__dirname, '../public'))); //  "public" off of current is root

app.use('/api', require('./routes'));


var server = app.listen(8090, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Running from: %s", __dirname);
    console.log("Example app listening at http://%s:%s", host, port)

});