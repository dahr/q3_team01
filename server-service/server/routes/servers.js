var express = require('express'),
    router = express.Router(),
    config = require('../Config'),
    jsonUtils = require('../service/JsonUtils'),
    blobService = require('../service/BlobService');

router.get('/', function (req, res) {

    blobService.getServers()
        .then(
            function(data){

                var content = data.content;
                console.log('Lab Content' + JSON.stringify(content));
                res.send(content);
            },
            function(error){
                res.send(error);
            }
        );

});


router.post('/', function (req, res) {

    // get the server data for the current labs
    blobService.getServers()
        .then(
            function(currentData){
                // then add the new server
                blobService.addServer(currentData, req.body)
                    .then(
                        function(data){

                            var content = jsonUtils.parseEncodedString(data.content);

                            console.log('Saved Lab Content' + JSON.stringify(content));
                            res.send(content);
                        },
                        function(error){
                            res.send(error);
                        }
                    );
            },
            function(error){
                res.send(error);
            }
        );




});

module.exports = router;