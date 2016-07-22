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

	//Test 1
	describe('toDoCtrl.todoAdd', function () {
		it('adds items toDoItems array', function () {
		    var controller=createController('toDoCtrl');
		    $scope.toDoItems=[];
		    $scope.todoInput='test';
		    $scope.todoAdd();
			expect($scope.toDoItems[0].todoText).toBe('test');
		});
	});
	//Test 2
	describe('toDoCtrl.remove', function(){
		it('remove deselected items from toDoItemsarray', function(){
		    var controller=createController('toDoCtrl');
		    $scope.toDoItems = [{todoText:'buy groceries', done:true},{todoText:'sleep', done:false}];
		    $scope.remove();
			expect($scope.toDoItems[0].todoText).toBe('sleep');
		});	
	});
	//Test 3
	describe('registerCtrl.addRegistrants',function(){
		it ('should save the username and password info', function(){
			var controller=createController('registerCtrl');
			$scope.username="Demetria";
			$scope.password="password";

			var $http=function(){
				return {username:$scope.Username, password:$scope.password};
			}
			expect($http()).toEqual({username:'Demetria', password:"password"});
		});
	});
	//Test 4
	describe('registerCtrl.addTeam', function () {
		it('saves team ', function () {
			var controller=createController('registerCtrl');
			$scope.teamName="Scrummers";

			var $http=function(){
				return {team_name:$scope.teamName};
			}
			expect($http()).toEqual({team_name:"Scrummers"});
		});
	});

	//Test 5
	describe('toDoCtrl.findTeamMembers', function () {
		it('adds team members an array', function () {
			 var controller=createController('toDoCtrl');
			$scope.teamMembers=[];
			var $http=function(){
				return {data.data.rows[i].user_name:"Demetria"};
		    $scope.findTeamMembers();
			expect($scope.teamMembers[0]).toBe("Demetria");
		}
		});
	});