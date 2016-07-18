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
        	console.log("It worked!");
        	console.log(data);
   
        }, 
        function errorCallback(data){
        	console.log("Not this time, buddy.");
            console.log(data);
        }); 
    }
});


// app.controller('loginCtrl', function($scope, $http, sendData,$rootScope,controlDisplay){
//     $scope.verifyUser = function(){  
//         $scope.showLogin= function(){
//         return controlDisplay.showLogin;
//         }
//         $http({
//             method:'GET',
//             url:'/users',
//             params: {username:$scope.username, password:$scope.password} 
//         }).then(function successCallback(data){
//             sendData.profileID=data.data.rows[0].profile_id;
//             sendData.userList=data.data.rows[0].item;
//             controlDisplay.showLogin=false;
//             controlDisplay.showRegister=false;
//             controlDisplay.showList=true;
//             $rootScope.$broadcast('receivedList')
   
//         }, 
//         function errorCallback(error){
//             console.log(error);
//         }); 

//     }
// });

// app.controller('createTeamCtrl', function($scope) {
// 	$scope.addTeam= function(){
// 		//need a function that will add a team to the database 
// 	}

// 	$scope.addUsers=function {
// 		    $scope.addRegistrants = function(){   
//         $http({
//             method:'POST',
//             url:'/scrum',
//             data: {username:$scope.newUser, password:$scope.newPassword} 
//         }).then(function successCallback(data){
//             return true;
//         }, 
//         function errorCallback(data){
//         return false;
//         });  
//     }
// 	}

// });

// app.controller('registerCtrl', function($scope) {
// 	$scope.addUser= function(){
// 		//need a function that will add a team to the database 
// 	}

// 	$scope.addUsers=function {
// 		//need a function that will add users to the team 
// 	}

// });

// 1. The user needs to register.
// 2. The user needs to login. 
// 3. The user needs the ability to create teams. 
// 4. Each team/project should have a to-do list. 
// 5. Each item has an assigned user. 
