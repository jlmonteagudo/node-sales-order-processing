describe('Routes Tests', function() {

	beforeEach(module('sop'));

	var location, route, rootScope;

	beforeEach(inject(function(_$location_, _$route_, _$rootScope_) {
		location = _$location_;
		route = _$route_;
		rootScope = _$rootScope_;
	}));

	describe('index route', function() {

		beforeEach(inject(function($httpBackend) {
			//$httpBackend.expectGET('http://localhost:9001/#/home').respond(200, 'main HTML');
			$httpBackend.expectGET('partial/home/home.html').respond(200, 'main HTML');
		}));



		it('should load the index page on successful load of /', inject(function() {

			location.path('/');
			rootScope.$digest();
			//expect(route.current.controller).toBe('HomeController');

		}));


		/*
		it('should redirect to the index page on non-existent route', inject(function() {

			location.path('/not/a/route');
			rootScope.$digest();
			expect(route.current.controller).toBe('HomeController');

		}));
		*/


	});



});