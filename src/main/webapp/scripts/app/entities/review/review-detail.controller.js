'use strict';

angular.module('definitivoApp')
    .controller('ReviewDetailController', function ($scope, $rootScope, $stateParams, entity, Review, Space, User) {
        $scope.review = entity;
        $scope.load = function (id) {
            Review.get({id: id}, function(result) {
                $scope.review = result;
            });
        };
        var unsubscribe = $rootScope.$on('definitivoApp:reviewUpdate', function(event, result) {
            $scope.review = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
