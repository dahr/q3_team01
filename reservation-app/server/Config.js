var Config = {
    teamNumber: '1',
    teamParam: '?teamID=1',
    TOPIC_APPROVAL_REQUEST: 'TEAM1_APPROVAL_REQUEST',
    TOPIC_SERVERCREATE_REQUEST: 'TEAM1_SERVERCREATE_REQUEST',

    url: {

        messagingProducer: (function () {
            return process.env.MESSAGING_SERVICE ? process.env.MESSAGING_SERVICE : 'localhost:2181';
        })(),
        reservationService: (function () {
            return process.env.RESERVATION_SERVICE ? process.env.RESERVATION_SERVICE + '/api/reservations' : 'http://localhost:8093/api/reservations';
        })(),

        serverService: (function () {
            return process.env.SERVER_SERVICE ? process.env.SERVER_SERVICE + '/api/servers' : 'http://localhost:8091/api/servers';
        })()

    }

};

module.exports = Config;