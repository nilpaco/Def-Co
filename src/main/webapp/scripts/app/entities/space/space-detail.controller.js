'use strict';

angular.module('definitivoApp')
    .controller('SpaceDetailController', function ($scope, $rootScope, $stateParams, entity, Space, Location, Service, Image, Favorite, Message, Review, User) {
        $scope.space = entity;
        $scope.load = function (id) {
            Space.get({id: id}, function(result) {
                $scope.space = result;
            });
        };
        var unsubscribe = $rootScope.$on('definitivoApp:spaceUpdate', function(event, result) {
            $scope.space = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
