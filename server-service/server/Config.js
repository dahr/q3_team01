var Config = {
    teamNumber: '1',

    TOPIC_SERVERCREATE_REQUEST: 'team1_SERVERCREATE_REQUEST',

    url: {
        messagingService: (function () {
            return process.env.MESSAGING_SERVICE ? process.env.MESSAGINGSERVICE :  'kafka:2181';
        })(),
        blobs: 'http://blobs.vmwaredevops.appspot.com/api/v1/blobs'

    }

};

module.exports = Config;