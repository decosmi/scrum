"use strict";
var express=require("express");
var app=express();

// var bodyParser = require('body-parser');
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// var databaseManager = require("./database-manager.js");




app.use(express.static("public"));
app.listen(3000,function(){
  console.log("listening on port",3000);
});

// app.post()