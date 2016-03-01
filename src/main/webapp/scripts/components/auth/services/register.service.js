'use strict';

angular.module('definitivoApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


