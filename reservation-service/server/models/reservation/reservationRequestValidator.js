var ReservationRequestException = require('./ReservationRequestException');

var reservationRequestException = {

    validate: function (reservation) {

        var errorList = [];
        if (!reservation.server_name) {
            errorList.push('Missing server_name');
        }
        if (!reservation.name) {
            errorList.push('Missing name');
        }
        if (!reservation.start_date) {
            errorList.push('Missing start_date');
        }
        if (!reservation.end_date) {
            errorList.push('Missing end_date');
        }

        if (errorList.length) {
            throw new ReservationRequestException(errorList);
        }

    }


};


module.exports = reservationRequestException;