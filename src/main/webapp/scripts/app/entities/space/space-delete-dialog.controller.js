'use strict';

angular.module('definitivoApp')
	.controller('SpaceDeleteController', function($scope, $uibModalInstance, entity, Space) {

        $scope.space = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Space.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
