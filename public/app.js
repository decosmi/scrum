"use strict";

var app = angular.module('myApp', []);

app.controller('toDoCtrl', function($scope) {
    $scope.toDoItems=[];

    $scope.toDoAdd = function() {
        $scope.toDoItems.push({todoText:$scope.todoInput, done:false});
        $scope.todoInput = "";
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

// 1. The user needs to register.
// 2. The user needs to login. 
// 3. The user needs the ability to create teams. 
// 4. Each team/project should have a to-do list. 
// 5. Each item has an assigned user. 
