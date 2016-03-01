'use strict';

angular.module('definitivoApp')
    .controller('FavoriteDetailController', function ($scope, $rootScope, $stateParams, entity, Favorite, Space, User) {
        $scope.favorite = entity;
        $scope.load = function (id) {
            Favorite.get({id: id}, function(result) {
                $scope.favorite = result;
            });
        };
        var unsubscribe = $rootScope.$on('definitivoApp:favoriteUpdate', function(event, result) {
            $scope.favorite = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
