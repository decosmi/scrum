"use strict";

var app = angular.module('myApp', []);

app.controller('toDoCtrl', function($scope) {
    $scope.toDoItems=[];

    $scope.toDoAdd = function() {
        $scope.toDoItems.push({todoText:$scope.todoInput, done:false});
        //$scope.todoInput = "";	//Why do I need this line? It doesn't break if I take it out. 
    };

    $scope.remove = function() {
        var oldList = $scope.toDoItems;
        $scope.toDoItems=[];

        angular.forEach(oldList, function(x) {
            if (!x.done) {
            $scope.toDoItems.push(x.todoText);
            }
        });
    };
});

app.controller('registerCtrl', function($scope, $http){   
    $scope.addRegistrants = function(){   
        $http({
            method:'POST',
            url:'/scrum',
            data: {username:$scope.newUser, password:$scope.newPassword} 
        }).then(function successCallback(data){
            console.log("It worked!");
        	console.log(data.config.data.username);
            return true;
        }, 
        function errorCallback(data){
        	console.log("It didn't work.");
        	console.log(data.config.data.username);

        return false;
        });  
    }
});

app.controller('loginCtrl', function($scope, $http){
    $scope.verifyUser = function(){  
        $http({
            method:'GET',
            url:'/scrum',
            params: {username:$scope.username, password:$scope.password} 
        }).then(function successCallback(data){
        }, 
        function errorCallback(data){
        	alert("Your username and password were not found. Please retry or register.")
        }); 
    }
});

app.controller('teamCtrl', function($scope,$http) {
	$scope.teamMembers=[];
    $scope.teams=[];
    $scope.teamID=[];

	$scope.addTeam= function(){
        console.log($scope.teamName);
        $http({
            method:'POST',
            url:'/team',
            data:{team_name:$scope.teamName}
        }).then(function successCallback(data){
        	alert("You've successfully added your team.");
        }, 
        function errorCallback(data){
     		console.log("Didn't work.");
        });  		
	}

    $scope.findTeams= function(){
        $http({
            method:'GET',
            url:'/team',
        }) 
        .then(function successCallback(data){
            for (var i=0; i<data.data.rows.length;i++) {
                $scope.teams.push(data.data.rows[i].team_name);
                $scope.teamID.push(data.data.rows[i].id);
            }      
            }, 
            function errorCallback(data){console.log("Didn't work.")
        });
    }
    $scope.joinTeam= function(){
        $http({
            method:'PUT',
            url:'/team',
        }).then(function successCallback(data){
            alert("You've successfully added your team.");
        }, 
        function errorCallback(data){
            console.log("Didn't work.");
        });         
    }
});