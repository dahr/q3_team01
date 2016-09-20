var config = require('../../Config'),
    ServerRequestDuplicateException = require('../server/ServerRequestDuplicateException');


var Blob = function () {
    this.id = parseInt(config.teamNumber);
    this.name = '';
    this.content = [];
    this.version = '1';
    this.tag = '';


};


Blob.prototype.clone = function (other) {
    this.name = other.name;
    this.tag = other.tag;
    this.version = other.version;
    this.content = other.content;
};


Blob.prototype.addServer = function (newServer) {

    // see if server already exists
    this.content.forEach(function (srv) {
        if (srv.name === newServer.name) {
            throw new ServerRequestDuplicateException('Server:' + newServer.name + ' already exists');
        }
    });

    // if not exist, add it to the array
    this.content.push(newServer);


};

module.exports = Blob;