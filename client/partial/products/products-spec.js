describe('ProductsService', function() {

	var ProductsService, $httpBackend;

	beforeEach(module('sop'));

	beforeEach(inject(function($injector, _$httpBackend_) {
		
		ProductsService = $injector.get('ProductsService');
		$httpBackend = _$httpBackend_;

		$httpBackend.whenGET('http://localhost:3000/api/products?filters=%7B%7D&options=%7B%22skip%22:0,%22limit%22:5%7D').respond(200, {
				'count': 2,
				'results': [
					{
						'description': 'Parachoques Delantero Ford Focus',
						'price': 95,
						'_id': '533957804f54233805104dcd',
						'__v': 0
					},
					{
						'description': 'Parachoques Trasero Ford Focus',
						'price': 105,
						'_id': '533957804f54233805104dce',
						'__v': 0
					}
				]
			}

		);


	}));


	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});



	it('Is defined', inject(function() {
		expect(ProductsService).toBeDefined();
	}));

	it('GetList returns a list of products', function() {
		
		var params = {
			filters: {},
			options: {
				skip: 0,
				limit: 5
			}
		};

		ProductsService.getList(params).then(function(data) {
			expect(data.count).toBe(2);
			expect(data.length).toBe(2);
			expect(data[0].price).toBe(95);
		});

		$httpBackend.flush();
		$httpBackend.resetExpectations();

	});


});


describe('ProductsListController', function() {

	var $scope, ProductsListController, $httpBackend, ProductsService, $modal;

	beforeEach(module('sop'));

	beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _ProductsService_, _$modal_, _$timeout_) {
		$scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		ProductsService = _ProductsService_;
		$modal = _$modal_;

		ProductsListController = $controller('ProductsListController', {$scope: $scope, ProductsService: ProductsService, $modal: $modal, $timeout: _$timeout_});

	}));	

	it('Test the values are set', function() {
		expect($scope.currentPage).toBe(1);
		expect($scope.itemsPerPage).toBe(5);
	});

	it('getListProducts returns a list of products', function() {

	});


});
