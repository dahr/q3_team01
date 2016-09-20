var serverRequestNotFoundException = function (message) {
    this.name = 'ServerRequestNotFoundException';
    this.message = message



};


serverRequestNotFoundException.prototype = new Error();
serverRequestNotFoundException.prototype.constructor = serverRequestNotFoundException;

module.exports = serverRequestNotFoundException;