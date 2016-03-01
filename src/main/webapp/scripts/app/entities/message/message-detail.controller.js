'use strict';

angular.module('definitivoApp')
    .controller('MessageDetailController', function ($scope, $rootScope, $stateParams, entity, Message, Space, User) {
        $scope.message = entity;
        $scope.load = function (id) {
            Message.get({id: id}, function(result) {
                $scope.message = result;
            });
        };
        var unsubscribe = $rootScope.$on('definitivoApp:messageUpdate', function(event, result) {
            $scope.message = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
