DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS individuals;
DROP TABLE IF EXISTS team;

CREATE TABLE team (
	id     		serial PRIMARY KEY,
	team_name	text
);

ALTER TABLE team OWNER TO scrum_server;


CREATE TABLE individuals (
	id 					serial PRIMARY KEY,
 	user_name			text,
	password			text,
	team_id				integer,			

	CONSTRAINT fk_from_team_to_individuals		 
	FOREIGN KEY (team_id)
	REFERENCES team(id)
);

ALTER TABLE individuals OWNER TO scrum_server;


CREATE TABLE goals (
	id     					serial PRIMARY KEY,
	goal    				text,
	team_id					integer,
	assigned_user_id		integer, 

	CONSTRAINT fk_from_individuals_to_goals
	FOREIGN KEY  (assigned_user_id)
	REFERENCES individuals(id),

	CONSTRAINT fk_from_team_to_goals		 
	FOREIGN KEY (team_id)
	REFERENCES team(id)
);

ALTER TABLE goals OWNER TO scrum_server;



