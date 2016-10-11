'use strict';

angular.module('app.services.servers', [])
    .service('ServersService', function ($http) {

        this.postServer = function (server) {

            return $http.post('/api/servers', server)
                .then(
                    function (response) {
                        return response.data;
                    });
        };

    });

