'use strict';

angular.module('definitivoApp')
    .factory('FavoriteSearch', function ($resource) {
        return $resource('api/_search/favorites/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
