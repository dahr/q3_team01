var approvalRequestDuplicateException = function (message) {
    this.name = 'ApprovalRequestDuplicateException';
    this.message = message



};


approvalRequestDuplicateException.prototype = new Error();
approvalRequestDuplicateException.prototype.constructor = approvalRequestDuplicateException;

module.exports = approvalRequestDuplicateException;