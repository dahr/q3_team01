var express = require('express'),
    request = require('request'),
    router = express.Router();



router.get('/', function (req, res) {

    // lets grab some random names from this public site
    var options = {
        url: 'http://uinames.com/api/?amount=25',
        headers: {

        }
    };

    request(options, function (error, response, body) {

        if (error) {
            return console.log('Error:', error);
        }

        //Check for right status code
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }

        console.log('Response Body');
        console.log(body);

        // parse the string json result into an object
        var responseData = JSON.parse(body);

        // let's manipulate and convert the data
        // add a random active property
        var serverData = [];
        var id = 0;
        responseData.forEach(function(user){
            id++;
            serverData.push(
                {
                    id: id,
                    server: user.surname,
                    location: user.region,
                    available: Math.random() >= 0.5
                }
            );
        });



        res.send(serverData);
    })


});

module.exports = router;