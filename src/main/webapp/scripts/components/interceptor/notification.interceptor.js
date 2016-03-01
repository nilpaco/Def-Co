 'use strict';

angular.module('definitivoApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-definitivoApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-definitivoApp-params')});
                }
                return response;
            }
        };
    });
