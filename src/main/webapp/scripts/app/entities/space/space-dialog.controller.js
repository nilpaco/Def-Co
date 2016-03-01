'use strict';

angular.module('definitivoApp').controller('SpaceDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Space', 'Location', 'Service', 'Image', 'Favorite', 'Message', 'Review', 'User',
        function($scope, $stateParams, $uibModalInstance, $q, entity, Space, Location, Service, Image, Favorite, Message, Review, User) {

        $scope.space = entity;
        $scope.locations = Location.query({filter: 'space-is-null'});
        $q.all([$scope.space.$promise, $scope.locations.$promise]).then(function() {
            if (!$scope.space.location || !$scope.space.location.id) {
                return $q.reject();
            }
            return Location.get({id : $scope.space.location.id}).$promise;
        }).then(function(location) {
            $scope.locations.push(location);
        });
        $scope.services = Service.query();
        $scope.images = Image.query();
        $scope.favorites = Favorite.query();
        $scope.messages = Message.query();
        $scope.reviews = Review.query();
        $scope.users = User.query();
        $scope.load = function(id) {
            Space.get({id : id}, function(result) {
                $scope.space = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('definitivoApp:spaceUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.space.id != null) {
                Space.update($scope.space, onSaveSuccess, onSaveError);
            } else {
                Space.save($scope.space, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
