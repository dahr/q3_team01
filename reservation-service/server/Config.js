var Config = {
    teamNumber: '6',
    teamParam: '?teamID=6',

    url: {
        approvalService: (function () {
            return process.env.APPROVAL_SERVICE ? process.env.APPROVAL_SERVICE + '/api/approvables' : 'http://localhost:8092/api/approvables';
        })(),

        serverService: (function () {
            return process.env.SERVER_SERVICE ? process.env.SERVER_SERVICE + '/api/servers' : 'http://localhost:8091/api/servers';
        })()

    }

};

module.exports = Config;

