'use strict';

angular.module('definitivoApp')
    .controller('ImageDetailController', function ($scope, $rootScope, $stateParams, DataUtils, entity, Image, Space) {
        $scope.image = entity;
        $scope.load = function (id) {
            Image.get({id: id}, function(result) {
                $scope.image = result;
            });
        };
        var unsubscribe = $rootScope.$on('definitivoApp:imageUpdate', function(event, result) {
            $scope.image = result;
        });
        $scope.$on('$destroy', unsubscribe);

        $scope.byteSize = DataUtils.byteSize;
    });
