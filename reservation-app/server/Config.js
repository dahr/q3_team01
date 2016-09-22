var Config = {
    teamNumber: '6',
    teamParam: '?teamID=6',

    url: {
        reservationService: (function () {
            return process.env.RESERVATION_SERVICE ? process.env.RESERVATION_SERVICE + '/api/reservations' : 'http://localhost:8093/api/reservations';
        })()

    }

};

module.exports = Config;