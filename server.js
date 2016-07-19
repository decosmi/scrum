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
	databaseManager.saveUser(request.body.username,request.body.password);
});

app.get("/scrum", function(request,response){
	databaseManager.readProfile(request.query.username,request.query.password, function(result){
		return response.send(result); 

	});
});

app.post("/team", function(request, response) {
	//console.log(request.body.team_name);
	databaseManager.createTeam(request.body.team_name);
});

app.get("/team", function(request, response) {
	databaseManager.retrieveTeams(function(result){
		return response.send(result);
	});
});

app.get("/userteam", function(request,response){
	databaseManager.getTeamIDFromName(request.query.team_name,request.query.id, databaseManager.updateUserWithTeam);
})