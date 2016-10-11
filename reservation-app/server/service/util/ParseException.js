var parseException = function (message) {
    this.name = 'ParseException';
    this.message = message;
};


parseException.prototype = new Error();
parseException.prototype.constructor = parseException;

module.exports = parseException;