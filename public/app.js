"use strict";

var app = angular.module('myApp', []);

app.controller('toDoCtrl', function($scope,$http,sendData,controlDisplay) {
    $scope.showGoals=function(){
        return controlDisplay.showGoals;
    }

    $scope.toDoItems=[];
    $scope.teamMembers=[];

    $scope.$on('Got the goods!', function(){
        var array=sendData.userGoals;
        //console.log(array);
        for(var i=0; i<array.length; i++ ){
   
        //console.log($scope.todoText);
        $scope.toDoItems.push({todoText:array[i].goal, done:false});
        //$scope.toDoText=array[i].goal;
        //console.log($scope.toDoItems);
        }
    });
    $scope.toDoAdd = function() {
        console.log("We did it..maybe.");
        $scope.toDoItems.push({todoText:$scope.todoInput, done:false});
        $http({
            method:'POST',
            url:'/goals',
            data:{goal:$scope.todoInput, status:false, team_id: sendData.teamID, assigned_user_id: sendData.assignedUserID}
        }).then(function successCallback(data){
            sendData.goalID=data.data.rows[0].id;
            console.log(sendData.goalID);
        }, 
        function errorCallback(data){
            console.log("Didn't work.");
            console.log(data);
        });         

        $scope.todoInput = "";	
    };

    $scope.remove = function() {
        var oldList = $scope.toDoItems;
        $scope.toDoItems=[];
        angular.forEach(oldList, function(x) {
            if (!x.done) {
                console.log(x);
                $scope.toDoItems.push(x);
                console.log($scope.toDoItems);
            }
            $http({
                method:'PUT',
                url:'/goals',
                data:{id:sendData.goalID}
            }).then(function successCallback(data){
                console.log("Way to go!");
            }, 
            function errorCallback(data){
                console.log("Didn't work.");
                console.log(data);
            });        
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

    $scope.assignTask = function(callback){  
        $http({
            method:'GET',
            url:'/goals',
            params: {username:$scope.selectedMember} 
        }).then(function successCallback(data){
            sendData.assignedUserID=data.data.rows[0].id;
            callback();
        }, 
        function errorCallback(data){
            console.log("Oops");
        }); 
    }

});

app.controller('registerCtrl', function($scope, $http,sendData,controlDisplay){  
    $scope.showRegister=function(){
        return controlDisplay.showRegister;
    } 
    $scope.teams=[];

    $scope.addRegistrants = function(){   
        $http({
            method:'POST',
            url:'/scrum',
            data: {username:$scope.newUser, password:$scope.newPassword,team_name:$scope.selectedName,} 
        }).then(function successCallback(data){
            controlDisplay.showLogin=true;
            console.log(controlDisplay.showLogin);
        }, 
        function errorCallback(data){
        	console.log("It didn't work.");
        });  
    }

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
            }      
            }, 
            function errorCallback(data){console.log("Didn't work.")
        });
    }
});

app.controller('loginCtrl', function($scope, $http,sendData,$rootScope,controlDisplay){
        $scope.showLogin=function(){
        return controlDisplay.showLogin;
    }
    $scope.verifyUser = function(callback){  
        $http({
            method:'GET',
            url:'/scrum',
            params: {username:$scope.username, password:$scope.password} 
        }).then(function successCallback(data){
            sendData.userID=data.data.rows[0].id;
            sendData.teamID=data.data.rows[0].team_id;
            sendData.username=data.data.rows[0].user_name;
            controlDisplay.showGoals=true;
            controlDisplay.showLogin=false;
            controlDisplay.showRegister=false;
            console.log(controlDisplay.showGoals);
            console.log(controlDisplay.showRegister);
            callback(sendData.userID);

        }, 
        function errorCallback(data){
        	console.log("Your username and password were not found. Please retry or register.");
            console.log(data);
        }); 
    }

    $scope.getToDoList= function(assigned_user_id){
        console.log(controlDisplay.showGoals);
        $http({
            method:'GET',
            url:'/savedgoals',
            params:{id: sendData.userID}
        }) 
        .then(function successCallback(data){
            sendData.userGoals=data.data.rows;
            $rootScope.$broadcast('Got the goods!');
            },      
            function errorCallback(data){console.log("Didn't work.")
        });
    }
});

app.controller('teamCtrl', function($scope,$http,sendData,controlDisplay) {
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
    this.username=0;
    this.teamID=30;
    this.assignedUserID=0;
    this.goalID=0;
    this.userGoals=[];
});

app.service('controlDisplay',function(){
    this.showRegister=true;
    this.showLogin=true;
    this.showGoals=false;
});