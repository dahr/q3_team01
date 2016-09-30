var Promise = require('promise'),
    config = require('../Config'),
    kafka = require('kafka-node');


var messagingService = {
    urlMsgClient: config.url.messagingService,

    postMessage: function (topic, message) {

        console.log(topic + ' - ' + JSON.stringify(message));

        var payloads = [
            {topic: topic, messages: message}
        ];

        return new Promise(function (resolve, reject) {

            var kafkaProducer = new kafka.HighLevelProducer(new kafka.Client(this.urlMsgClient));

            kafkaProducer.on('ready', function () {
                kafkaProducer.send(payloads,
                    function (err, data) {
                        console.log('Responsedata:' + data);
                        resolve(data);
                    });
            });
        });

    }


};


module.exports = messagingService;