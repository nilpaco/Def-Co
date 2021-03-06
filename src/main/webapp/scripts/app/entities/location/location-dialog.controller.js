'use strict';

angular.module('definitivoApp').controller('LocationDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Location','NgMap',
        function($scope, $stateParams, $uibModalInstance, entity, Location, NgMap) {



        $scope.location = entity;




            $scope.load = function(id) {
            Location.get({id : id}, function(result) {
                $scope.location = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('definitivoApp:locationUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.location.id != null) {
                Location.update($scope.location, onSaveSuccess, onSaveError);
            } else {
                Location.save($scope.location, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

            $scope.vm = this;
            $scope.lat = [];
            $scope.lng = [];
            $scope.vm.placeChanged = function() {
                $scope.vm.place = this.getPlace();
                console.log('location', $scope.vm.place.geometry.location);
                $scope.vm.map.setCenter($scope.vm.place.geometry.location);
                $scope.lat = $scope.vm.place.geometry.location.lat();
                $scope.lng = $scope.vm.place.geometry.location.lng();

            }
            NgMap.getMap().then(function(map) {
                $scope.vm.map = map;
            });

        }]);
