'use strict';

angular.module('definitivoApp')
    .factory('Service', function ($resource, DateUtils) {
        return $resource('api/services/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
