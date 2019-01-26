DROP DATABASE IF EXISTS player;
CREATE DATABASE player;
USE player;

CREATE TABLE playerstats (
    id int NOT NULL AUTO_INCREMENT,
	player_name varchar(255) NOT NULL,    
	reputation int NOT NULL,
	knowledge int NOT NULL,
	sanity int NOT NULL,
    turn int NOT NULL,
	PRIMARY KEY (id)
);