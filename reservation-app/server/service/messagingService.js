var Promise = require('promise'),
    config = require('../Config'),
    kafka = require('kafka-node');


var messagingService = {
    urlMsgClient: config.url.messagingProducer,

    postMessage: function (topic, message) {

        var _self = this;
        var messageString = JSON.stringify(message);
        console.log(topic + ' - ' + messageString);

        var payloads = [
            {topic: topic, messages: messageString}
        ];

        return new Promise(function (resolve, reject) {

            var kafkaProducer = new kafka.HighLevelProducer(new kafka.Client(_self.urlMsgClient));


            console.log('Creating Producer:' + kafkaProducer.client.clientId + ' ' + kafkaProducer.client.connectionString);
            kafkaProducer.on('ready', function () {
                console.log('Sending Payload:' + JSON.stringify(payloads));
                kafkaProducer.send(payloads,
                    function (err, data) {
                        if(err){
                            return reject(err);
                        }
                        console.log('MsgResponse:' + JSON.stringify(data));
                        resolve(data);
                    });
            });
        });

    }


};


module.exports = messagingService;