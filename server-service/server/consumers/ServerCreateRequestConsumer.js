var kafka = require('kafka-node'),
    config = require('../Config'),
    blobService = require('../service/BlobService'),
    Server = require('../models/server/Server'),
    ServerRequestException = require('../models/server/ServerRequestException'),
    ServerDuplicateRequestException = require('../models/server/ServerRequestDuplicateException'),
    ServerRequestNotFoundException = require('../models/server/ServerRequestNotFoundException');


(function ServerCreateRequestConsumer() {

    console.log('Creating Consumer for Server Create');

    var consumer = new kafka.HighLevelConsumer(
        new kafka.Client(config.url.messagingService), [{topic: config.TOPIC_SERVERCREATE_REQUEST}]
    );


    console.log('Creating Event Handler for Server Create:' + consumer.client.clientId + ' ' + consumer.client.connectionString);
    consumer.on('message', function (message) {
        console.log('Kafka Topic:' + message.topic + ' Kafka Message:' + message.value);


        blobService.getServers()
            .then(
                function (currentData) {
                    try {

                        var server = new Server(JSON.parse(message.value));

                        // then add the new server
                        blobService.addServer(currentData, server)
                            .then(
                                function (blob) {
                                    console.log('Saved Lab Content' + JSON.stringify(blob));
                                },
                                function (error) {
                                    console.log('ERROR ADDING SERVER:' + error)
                                }
                            );

                    } catch (e) {
                        if (e instanceof ServerRequestException) {
                            console.log('ERROR FORMAT:' + e);
                        } else if (e instanceof ServerDuplicateRequestException) {
                            console.log('ERROR DUPLICATE:' + e);
                        } else {
                            console.log('ERROR:' + e);
                        }

                    }

                },
                function (error) {
                    console.log('ERROR SERVERS:' + error);
                }
            );


    });

})();


