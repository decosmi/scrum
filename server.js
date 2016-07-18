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
	response.send(request.body.data); 
	console.log(request.body.username);
	databaseManager.saveUser(request.body.username,request.body.password);
});

app.get("/scrum", function(request,response){
	response.send(request);
	console.log(request);
	databaseManager.readProfile("Tristan","password");
});