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

	var getTeamIDFromName= function(team_name,userID,callback){
		console.log(userID);
		console.log(team_name);
		pool.query(
			"SELECT id FROM team" +
			" WHERE team_name = $1;", [team_name], function(error,result){
				if (error) return console.log("Whoops");
				//console.log(result.rows);
				//console.log(userID);
				callback(userID, result.rows[0].id);
			});

	}

	var updateUserWithTeam= function(userID,teamID){
		//console.log("This is what it received for teamID:")
		//console.log(teamID.rows);
		//console.log("This is what it received for userID:")
		//console.log(userID.rows);
		pool.query (
			"UPDATE individuals" +
			" SET team_id = $1" +
			" WHERE id= $2;", [teamID, userID], function(error,result){
				if (error) return console.log("Oops");
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

 	return {
 		saveUser: saveUser,
 		readProfile: readProfile,
 		createTeam: createTeam,
 		retrieveTeams: retrieveTeams,
 		updateUserWithTeam: updateUserWithTeam,
 		getTeamIDFromName: getTeamIDFromName
	};

})();


	// var createGoal= function(goal,team_id, assigned_user_id){
	// 	pool.query(
	// 		"INSERT INTO goals" +
	// 		" (item, profile_id)" +
	// 		" VALUES ($1,$2,$3)", [item, profile_id,assigned_user_id], function(error,result){
	// 			if (error) return console.log(error);
	// 		}
	// 	);
	// }

	// var addTeamMembers= function(unsure){ 
	// 	pool.query(
	// 		This function cannot be built until I understand how my team table should be organized.
	// 		, function(error,result){
	// 			if (error) return console.log(error);
	// 		}
	// 	);
	// }
