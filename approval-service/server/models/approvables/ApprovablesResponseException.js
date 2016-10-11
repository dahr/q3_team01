var approvablesResponseException = function (field) {
    this.name = 'ApprovablesResponseException';
    this.message = "Invalid Approvables Response:" + field ;


};


approvablesResponseException.prototype = new Error();
approvablesResponseException.prototype.constructor = approvablesResponseException;

module.exports = approvablesResponseException;