'use strict';

angular.module('definitivoApp')
    .factory('MessageSearch', function ($resource) {
        return $resource('api/_search/messages/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
