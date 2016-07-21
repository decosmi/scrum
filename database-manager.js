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

	var saveUser= function(username,password,teamname,callback){
		pool.query (
			"INSERT INTO individuals" +
			"(user_name, password)" +
			"VALUES ($1, $2) RETURNING id", [username, password], function (error, result){
				if (error) return console.log(error);
				callback(result);
			}
		);
	}

	var getUserIDFromName= function(username,callback){
		pool.query(
			"SELECT id FROM individuals" +
			" WHERE user_name = $1;", [username], function(error,result){
				if (error) return console.log("Whoops");
				callback(result);
			});

	}

	var getTeamIDFromName= function(team_name,userID,callback){
		pool.query(
			"SELECT id FROM team" +
			" WHERE team_name = $1;", [team_name], function(error,result){
				if (error) return console.log("Whoops");
				callback(userID, result.rows[0].id);
			});

	}

	var updateUserWithTeam= function(userID,team_id){
		pool.query (
			"UPDATE individuals" +
			" SET team_id = $1" +
			" WHERE id= $2;", [team_id, userID], function(error,result){
				if (error) return console.log("Oops");
			}
		);
	}

	var updateGoals= function(id){
		pool.query (
			"DELETE FROM goals" +
			" WHERE id= $1;", [id], function(error,result){
				if (error) return console.log("Oops");
			}
		);
	}

	var readProfile= function(username,password,callback){
		pool.query(
			"SELECT * FROM individuals" +
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

	var getTeamMembers= function(team_id,callback){
		pool.query(
			"SELECT user_name FROM individuals" +
			" WHERE team_id = $1;", [team_id], function(error,result){
				if (error) return console.log("Whoops");
				callback(result);
			});

	}
	var createGoal= function(goal,status,team_id, assigned_user_id,callback){
		pool.query(
			"INSERT INTO goals" +
			" (goal, status, team_id, assigned_user_id)" +
			" VALUES ($1,$2,$3,$4) RETURNING id", [goal,status,team_id,assigned_user_id], function(error,result){
				if (error) return console.log(error);
				callback(result);
			}
		);
	}

	var retrieveGoals= function(assigned_user_id, callback){
		pool.query(
			"SELECT goal FROM goals" +
			" WHERE assigned_user_id = $1;", [assigned_user_id], function(error,result){
				if (error) return console.log("Whoops");
				callback(result);
			});

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
 		getTeamMembers: getTeamMembers,
 		updateGoals: updateGoals,
 		retrieveGoals: retrieveGoals
	};

})();





