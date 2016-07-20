"use strict";

var Pool = require("pg").Pool;
process.on("unhandledRejection", function(e) {
  console.log(e.message, e.stack);
});

module.exports = (function() {
  var config = {
    host: "localhost",
    user: "scrum_server",
    password: "password",
    database: "postgres"
  };

	var pool = new Pool(config);

	var saveUser= function(username,password){
		pool.query (
			"INSERT INTO individuals" +
			"(user_name, password)" +
			"VALUES ($1, $2) RETURNING id", [username, password], function (error, result){
				if (error) return console.log(error);
			}
		);
	}

	var getUserIDFromName= function(username,callback){
		console.log(username);
		pool.query(
			"SELECT id FROM individuals" +
			" WHERE user_name = $1;", [username], function(error,result){
				if (error) return console.log("Whoops");
				callback(result);
			});

	}

	var getTeamIDFromName= function(team_name,userID,callback){
		console.log(userID);
		console.log(team_name);
		pool.query(
			"SELECT id FROM team" +
			" WHERE team_name = $1;", [team_name], function(error,result){
				if (error) return console.log("Whoops");
				console.log(result.rows[0].id);
				callback(userID, result.rows[0].id);
			});

	}
	var partialUpdateUserWithTeam= function(userID,callback){
		return function(teamID) {
			updateUserWithTeam(userID,teamID,callback)
		}
	}


	var updateUserWithTeam= function(userID,teamID,callback){
		pool.query (
			"UPDATE individuals" +
			" SET team_id = $1" +
			" WHERE id= $2;", [teamID, userID], function(error,result){
				if (error) return console.log("Oops");
				callback(result);//here I would like to have a callback that returns the response to app.js
			}
		);
	}

	var readProfile= function(username,password,callback){
		pool.query(
			"SELECT id FROM individuals" +
			" WHERE user_name = $1" +
			" AND password = $2;", [username, password], function(error, result){
				if (error) return console.log(error);
				callback(result);
			}
		);
	}

	var createTeam= function(team_name){
		pool.query(
			"INSERT INTO team" +
			" (team_name)" +
			" VALUES ($1)", [team_name], function(error,result){
				if (error) return console.log(error);
			}
		);
	}	

	var retrieveTeams= function(callback){
		pool.query(
			"SELECT * FROM team", function(error,result){
				if (error) return console.log(error);
				callback(result);
			});

	}	

	var retrieveUsers= function(callback){
		pool.query(
			"SELECT * FROM individuals", function(error,result){
				if (error) return console.log(error);
				callback(result);
			});

	}

	var retrieveUsers= function(callback){
		pool.query(
			"SELECT * FROM individuals", function(error,result){
				if (error) return console.log(error);
				callback(result);
			});

	}

	var getTeamMembers= function(team_id,callback){
		pool.query(
			"SELECT user_name FROM individuals" +
			" WHERE team_id = $1;", [team_id], function(error,result){
				if (error) return console.log("Whoops");
				callback(result);
			});

	}
	var createGoal= function(goal,team_id, user_id,callback){
		pool.query(
			"INSERT INTO goals" +
			" (goal, team_id, user_id)" +
			" VALUES ($1,$2,$3)", [goal, team_id,user_id], function(error,result){
				if (error) return console.log(error);
				callback(result);
			}
		);
	}


 	return {
 		saveUser: saveUser,
 		readProfile: readProfile,
 		createTeam: createTeam,
 		retrieveTeams: retrieveTeams,
 		updateUserWithTeam: updateUserWithTeam,
 		getTeamIDFromName: getTeamIDFromName,
 		retrieveUsers: retrieveUsers,
 		getUserIDFromName: getUserIDFromName,
 		createGoal: createGoal,
 		partialUpdateUserWithTeam: partialUpdateUserWithTeam,
 		getTeamMembers: getTeamMembers
	};

})();





