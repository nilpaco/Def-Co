'use strict';

angular.module('definitivoApp')
    .controller('LocationController', function ($scope, $state, Location, LocationSearch, ParseLinks) {

        $scope.locations = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Location.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.locations = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            LocationSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.locations = result;
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

        $scope.clear = function () {
            $scope.location = {
                streetAddress: null,
                postalCode: null,
                city: null,
                stateProvince: null,
                lat: null,
                lng: null,
                id: null
            };
        };
    });
