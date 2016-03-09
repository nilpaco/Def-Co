'use strict';

angular.module('definitivoApp')
    .factory('Space', function ($resource, DateUtils) {
        return $resource('api/spaces/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'getUserSpaces': {
                method: 'GET',
                isArray: true,
                url: 'api/spaces/userliked'
            },
            'addMessage': { method: 'POST', isArray: false, url: 'api/spaces/:id/messages'},
            'checkMessages': {method: 'GET', isArray: true, url: 'api/spaces/:id/usermessages'}
        });
    });
