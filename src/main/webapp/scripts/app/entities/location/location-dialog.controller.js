'use strict';

angular.module('definitivoApp').controller('LocationDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Location',
        function($scope, $stateParams, $uibModalInstance, entity, Location, geocoder) {

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

            /*$('.callToCtrl').click(asdf);
            function asdf(){
                $scope.location = {
                    streetAddress: $scope.output.address_components[0],
                    postalCode: null,
                    city: null,
                    stateProvince: null,
                }
            }*/

        }]);
