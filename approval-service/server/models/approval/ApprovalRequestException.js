var approvalRequestException = function (field) {
    this.name = 'ApprovalRequestException';
    this.message = "Invalid Approval Request Fields:" + field +

    "\n\
    { \n\
        \"name\": \"ServerName\", \n\
        \"date\": \"YYYYMMDD\", \n\
        \"user\": \"First Last\", \n\
        \"email\": \"flast@vmware.com\" \n\
    }\";\n";


};


approvalRequestException.prototype = new Error();
approvalRequestException.prototype.constructor = approvalRequestException;

module.exports = approvalRequestException;