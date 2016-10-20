var kafka = require('kafka-node'),
    config = require('../Config'),
    ApprovalRequest = require('../models/approval/ApprovalRequest'),
    approvalService = require('../service/approvalService');


(function ApprovalRequestConsumer() {

    var consumer = new kafka.HighLevelConsumer(
        new kafka.Client(config.url.messagingService), [{topic: config.TOPIC_APPROVAL_REQUEST}]
    );

    console.log('Creating Event Handler for Approval:' + consumer.client.clientId + ' ' + consumer.client.connectionString);
    consumer.on('message', function (message) {
        console.log('Kafka Topic:' + message.topic + ' Kafka Message:' + message.value);

        try{
            var approvalRequest = new ApprovalRequest(JSON.parse(message.value));
            approvalService.addApproval(approvalRequest);

        }catch(e){
            console.log('Approval Message Error:' + e);
        }
    });

})();


