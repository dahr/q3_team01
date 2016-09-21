var reservationRequestException = function (field) {
    this.name = 'ReservationRequestException';
    this.message = 'Invalid Reservation Request:' + field ;


};


reservationRequestException.prototype = new Error();
reservationRequestException.prototype.constructor = reservationRequestException;

module.exports = reservationRequestException;