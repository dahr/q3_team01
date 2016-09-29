var kafka = require('kafka-node'),
    config = require('../Config');


(function testRequestConsumer() {

    var consumer =  new kafka.HighLevelConsumer(
        new kafka.Client(), [{topic: 'test'}]
    );

    consumer.on('message', function (message) {
        console.log('Kafka Topic:' + message.topic + ' Kafka Message:' + message.value);
    });

})();


