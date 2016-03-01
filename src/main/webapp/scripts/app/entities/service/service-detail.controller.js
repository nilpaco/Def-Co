'use strict';

angular.module('definitivoApp')
    .controller('ServiceDetailController', function ($scope, $rootScope, $stateParams, entity, Service, Space) {
        $scope.service = entity;
        $scope.load = function (id) {
            Service.get({id: id}, function(result) {
                $scope.service = result;
            });
        };
        var unsubscribe = $rootScope.$on('definitivoApp:serviceUpdate', function(event, result) {
            $scope.service = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
