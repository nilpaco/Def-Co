'use strict';

angular.module('definitivoApp')
    .controller('MainController', function ($scope, Principal, entity, Space, ParseLinks, Favorite, toaster) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });

        $scope.spaces = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Space.getUserSpaces({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.spaces = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            SpaceSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.spaces = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.like = function(id){
            Favorite.addLike({id: id},{},successLike);
        }

        var successLike = function(result) {
            for (var k = 0; k < $scope.spaces.length; k++) {
                if ($scope.spaces[k].space.id == result.space.id) {
                    $scope.spaces[k].liked = result.liked;
                }
            }
            if(result.liked == false){
                toaster.pop('success',result.space.name,"Removed");

            }else{
                toaster.pop('success',result.space.name,"Added")
            }

        }

        $scope.data = [];
        $scope.position = [];
        $scope.data =[
            {foo:1, bar:1},
            {foo:2, bar:2},
            {foo:3, bar:3},
            {foo:4, bar:4},
            {foo:5, bar:5},
            {foo:6, bar:6},
            {foo:7, bar:7}
        ];
        $scope.positions =[
            {pos:[40.71, -74.21]},
            {pos:[40.72, -74.20]},
            {pos:[40.73, -74.19]},
            {pos:[40.74, -74.18]},
            {pos:[40.75, -74.17]},
            {pos:[40.76, -74.16]},
            {pos:[40.77, -74.15]}
        ];

    });
