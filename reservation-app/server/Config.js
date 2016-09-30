var Config = {
    teamNumber: '6',
    teamParam: '?teamID=6',
    TOPIC_RESERVATION_REQUEST: 'APPROVAL_REQUEST',

    url: {

        messagingService: (function () {
            return process.env.MESSAGING_SERVICE ? process.env.MESSAGINGSERVICE : 'kafka:2181';
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