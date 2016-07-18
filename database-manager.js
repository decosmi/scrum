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

	var readProfile= function(username,password){
		pool.query(
			"SELECT id FROM individuals" +
			" WHERE user_name = $1" +
			" AND password = $2;", [username, password], function(error, result){
				if (error) return console.log(error);
				//var profileID=result.rows[0].id;
			}
		);
	}

	var createTeam= function(team_name){
		console.log(team_name);
		pool.query(
			"INSERT INTO team" +
			" (team_name)" +
			" VALUES ($1)", [team_name], function(error,result){
				if (error) return console.log(error);
			}
		);
	}	

 	return {
 		saveUser: saveUser,
 		readProfile: readProfile,
 		createTeam: createTeam
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
