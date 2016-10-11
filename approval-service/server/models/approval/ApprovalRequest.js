var approvalRequestValidator = require('./approvalRequestValidator');


var approvalRequest = function (other) {

    approvalRequestValidator.validate(other);

    this.name = other.name;
    this.date = other.date;
    this.user = other.user;
    this.email = other.email;

};


approvalRequest.prototype.toString = function () {
    return JSON.stringify(this);
};


module.exports = approvalRequest;