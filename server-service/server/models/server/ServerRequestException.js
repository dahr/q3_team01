var serverRequestException = function (field) {
    this.name = 'ServerRequestException';
    this.message = 'Invalid Server Request Fields:' + field ;


};


serverRequestException.prototype = new Error();
serverRequestException.prototype.constructor = serverRequestException;

module.exports = serverRequestException;