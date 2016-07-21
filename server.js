"use strict";
var express=require("express");
var app=express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var databaseManager = require("./database-manager.js");


app.use(express.static("public"));
app.listen(3000,function(){
  console.log("listening on port",3000);
});

app.post("/scrum", function(request, response) {
	databaseManager.saveUser(request.body.username,request.body.password,request.body.team_name,function(result){
		return response.send(result);
	});
});

app.get("/scrum", function(request,response){
	databaseManager.readProfile(request.query.username,request.query.password, function(result){
		return response.send(result); 

	});
});

app.post("/team", function(request, response) {
	databaseManager.createTeam(request.body.team_name)
	});

app.get("/team", function(request, response) {
	databaseManager.retrieveTeams(function(result){
		return response.send(result);
	});
});

app.get("/userteam", function(request,response){
	databaseManager.getTeamIDFromName(request.query.team_name,request.query.id, databaseManager.UpdateUserWithTeam);
});

app.get("/users", function(request,response){
	databaseManager.retrieveUsers(function(result){
		return response.send(result);
	});
});

app.get("/teammembers", function(request,response){
	databaseManager.getTeamMembers(request.query.team_id, function(result){
		return response.send(result);
	});
});

app.get("/goals", function(request,response){
	databaseManager.getUserIDFromName(request.query.username, function(result){
		return response.send(result); 

	});
});

app.post("/goals", function(request,response){
	databaseManager.createGoal(request.body.goal, request.body.status,request.body.team_id,request.body.assigned_user_id, function(result){
		return response.send(result);
	 });
});

app.put("/goals", function(request,response){
	databaseManager.updateGoals(request.body.id);
});

app.get("/savedgoals", function(request,response){
	databaseManager.retrieveGoals(request.query.id, function(result){
		return response.send(result);
	});
});