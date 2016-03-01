'use strict';

angular.module('definitivoApp')
    .controller('LocationDetailController', function ($scope, $rootScope, $stateParams, entity, Location) {
        $scope.location = entity;
        $scope.load = function (id) {
            Location.get({id: id}, function(result) {
                $scope.location = result;
            });
        };
        var unsubscribe = $rootScope.$on('definitivoApp:locationUpdate', function(event, result) {
            $scope.location = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
