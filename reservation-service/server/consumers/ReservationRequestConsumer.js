var kafka = require('kafka-node'),
    config = require('../Config'),
    reservationService = require('../service/reservationService');


(function ReservationRequestConsumer() {

    var consumer =  new kafka.HighLevelConsumer(
        new kafka.Client(), [{topic: config.TOPIC_RESERVATION_REQUEST}]
    );

    consumer.on('message', function (message) {
        console.log('Kafka Topic:' + message.topic + ' Kafka Message:' + message.value);

        //reservationService.createReservation(JSON.parse(message.value));
    });

})();


