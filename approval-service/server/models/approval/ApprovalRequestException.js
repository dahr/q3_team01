var approvalRequestException = function (field) {
    this.name = 'ApprovalRequestException';
    this.message = 'Invalid Approval Request Fields:' + field ;


};


approvalRequestException.prototype = new Error();
approvalRequestException.prototype.constructor = approvalRequestException;

module.exports = approvalRequestException;