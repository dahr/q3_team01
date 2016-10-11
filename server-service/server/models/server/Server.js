var serverRequestValidator = require('./serverRequestValidator');

var server = function (other) {

    this.name = '';
    this.description = '';

    if (other) {
        serverRequestValidator.validate(other);

        this.name = other.name;
        this.description = '';

        if (other.description) {
            this.description = other.description;
        }

    }

};


module.exports = server;