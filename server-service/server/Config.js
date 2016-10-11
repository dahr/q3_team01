var Config = {
    teamNumber: '6',

    TOPIC_SERVERCREATE_REQUEST: 'SERVERCREATE_REQUEST',

    url: {
        messagingService: (function () {
            return process.env.MESSAGING_SERVICE ? process.env.MESSAGINGSERVICE : 'localhost:2181';
        })(),
        blobs: 'http://blobs.vmwaredevops.appspot.com/api/v1/blobs'

    }

};

module.exports = Config;