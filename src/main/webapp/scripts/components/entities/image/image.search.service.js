'use strict';

angular.module('definitivoApp')
    .factory('ImageSearch', function ($resource) {
        return $resource('api/_search/images/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
