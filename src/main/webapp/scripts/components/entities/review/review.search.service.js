'use strict';

angular.module('definitivoApp')
    .factory('ReviewSearch', function ($resource) {
        return $resource('api/_search/reviews/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
