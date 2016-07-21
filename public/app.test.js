describe('myApp', function () {
		
	beforeEach(module('myApp'));

	var $controller;
	var $scope;

	beforeEach(inject(function($controller, $rootScope){
		$scope=$rootScope.$new();
		createController= function (ctrl){
			return $controller(ctrl,{"$scope":$scope});
		}
	}));

	describe('toDoCtrl.todoAdd', function () {



