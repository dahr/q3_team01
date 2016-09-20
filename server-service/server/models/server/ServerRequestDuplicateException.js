var serverRequestDuplicateException = function (message) {
    this.name = 'ServerRequestDuplicateException';
    this.message = message



};


serverRequestDuplicateException.prototype = new Error();
serverRequestDuplicateException.prototype.constructor = serverRequestDuplicateException;

module.exports = serverRequestDuplicateException;