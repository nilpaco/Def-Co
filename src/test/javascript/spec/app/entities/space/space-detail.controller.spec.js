'use strict';

describe('Controller Tests', function() {

    describe('Space Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockSpace, MockLocation, MockService, MockImage, MockFavorite, MockMessage, MockReview, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockSpace = jasmine.createSpy('MockSpace');
            MockLocation = jasmine.createSpy('MockLocation');
            MockService = jasmine.createSpy('MockService');
            MockImage = jasmine.createSpy('MockImage');
            MockFavorite = jasmine.createSpy('MockFavorite');
            MockMessage = jasmine.createSpy('MockMessage');
            MockReview = jasmine.createSpy('MockReview');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Space': MockSpace,
                'Location': MockLocation,
                'Service': MockService,
                'Image': MockImage,
                'Favorite': MockFavorite,
                'Message': MockMessage,
                'Review': MockReview,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("SpaceDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'definitivoApp:spaceUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
