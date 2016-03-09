'use strict';

angular.module('definitivoApp')
    .controller('SpaceDetailController', function ($scope, $rootScope, $stateParams, entity, Space, Location, Service, Image, Favorite, Message, Review, User, messages) {
        $scope.space = entity;
        $scope.messages = messages;

        $scope.load = function (id) {
            Space.get({id: id}, function(result) {
                $scope.space = result;
            });
        };
        var unsubscribe = $rootScope.$on('definitivoApp:spaceUpdate', function(event, result) {
            $scope.space = result;
        });
        $scope.$on('$destroy', unsubscribe);

        $scope.addMessage = function (){
            Space.addMessage({id:$scope.space.id}, {text:$scope.text2});
        }


    });
