var config = require('../../Config');



var approval = function () {
    this.id = 0;
    this.teamID = parseInt(config.teamNumber);
    this.blob = 0;
    this.description = '';
    this.approved = false;


};


approval.prototype.clone = function (other) {
    this.id = other.id;
    this.teamID = other.teamID;
    this.blob = other.blob;
    this.description = other.description;
    this.approved = other.approved;
};




module.exports = approval;