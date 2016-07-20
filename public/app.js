"use strict";

var app = angular.module('myApp', []);

app.controller('toDoCtrl', function($scope,$http,sendData) {
    $scope.toDoItems=[];
    $scope.teamMembers=[];

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

    $scope.findTeamMembers= function(){
        $http({
            method:'GET',
            url:'/teammembers',
            params:{team_id: sendData.teamID}
        }) 
        .then(function successCallback(data){
            for (var i=0; i<data.data.rows.length;i++) {
                $scope.teamMembers.push(data.data.rows[i].user_name);
            }      
            }, 
            function errorCallback(data){console.log("Didn't work.")
        });
    }

    $scope.assignTask = function(){  
        $http({
            method:'GET',
            url:'/goals',
            params: {username:$scope.selectedMember} 
        }).then(function successCallback(data){
            sendData.assignedUserID=data.data.rows[0].id;
            console.log(sendData.assignedUserID);
        }, 
        function errorCallback(data){
            console.log("Oops");
        }); 
    }

});

app.controller('registerCtrl', function($scope, $http){   
    $scope.addRegistrants = function(){   
        $http({
            method:'POST',
            url:'/scrum',
            data: {username:$scope.newUser, password:$scope.newPassword} 
        }).then(function successCallback(data){
        }, 
        function errorCallback(data){
        	console.log("It didn't work.");
        });  
    }
    
    $scope.joinTeam= function(){
        $http({
            method:'GET',
            url:'/userteam',
            params: {team_name:$scope.selectedName, id:sendData.userID} 
        }).then(function successCallback(data){
            console.log(data);
        }, 
        function errorCallback(data){
            console.log("Didn't work.");
        });         
    }
});

app.controller('loginCtrl', function($scope, $http,sendData){
    $scope.verifyUser = function(){  
        $http({
            method:'GET',
            url:'/scrum',
            params: {username:$scope.username, password:$scope.password} 
        }).then(function successCallback(data){
            sendData.userID=data.data.rows[0].id;
            console.log(sendData.userID);
        }, 
        function errorCallback(data){
        	console.log("Your username and password were not found. Please retry or register.");
            console.log(data);
        }); 
    }
});

app.controller('teamCtrl', function($scope,$http,sendData) {
    $scope.teams=[];
    $scope.teamID=[];//make sure to delete this and the push function that goes with it if you don't use it


	$scope.addTeam= function(){
        $http({
            method:'POST',
            url:'/team',
            data:{team_name:$scope.teamName}
        }).then(function successCallback(data){
            console.log(data);
        }, 
        function errorCallback(data){
     		console.log("Didn't work.");
            console.log(data);
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


    $scope.findUsers= function(){
        $scope.users=sendData.users
        console.log($scope.users);
        $http({
            method:'GET',
            url:'/users',
        }) 
        .then(function successCallback(data){
            for (var i=0; i<data.data.rows.length;i++) {
                $scope.users.push(data.data.rows[i].user_name);
            }      
            }, 
            function errorCallback(data){console.log("Didn't work.")
        });
    }


});



app.service('sendData',function(){
    this.userID=0;
    this.users=[];
    this.teamID=30;
    this.assignedUserID=0;

});