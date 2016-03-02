'use strict';

angular.module('definitivoApp')
    .controller('MainController', function ($scope, Principal, entity, Space, ParseLinks, Favorite) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });

        $scope.spaces = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Space.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
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
                    if ($scope.spaces[k].liked) {
                        $scope.spaces[k].total += 1;
                    }
                    else {
                        $scope.spaces[k].total -= 1;
                    }
                }
            }

        }
    });
