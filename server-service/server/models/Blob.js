var config = require('../Config'),
    jsonUtils = require('../service/JsonUtils');


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

    // convert the existing data to a json object
    var content = jsonUtils.parseEncodedString(this.content);

    // see if server already exists
    var found = false;
    content.forEach(function (srv) {
        if (srv.name === newServer.name) {
            found = true;
            console.log('Server:' + newServer.name + ' already exists');
        }
    });

    // if not add it to the array
    if (!found) {
        content.push(newServer);
    }

    // set the content to a string
    this.content = JSON.stringify(content);

};

module.exports = Blob;