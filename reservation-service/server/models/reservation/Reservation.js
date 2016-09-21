var reservationRequestValidator = require('./reservationRequestValidator');

var reservation = function (other) {

    this.server_name = '';
    this.name = '';
    this.start_date = '';
    this.end_date = '';

    if (other) {
        reservationRequestValidator.validate(other);

        this.server_name = other.server_name;
        this.name = other.name;
        this.start_date = other.start_date;
        this.end_date = other.end_date;


    }

};


module.exports = reservation;