CREATE EXTENSION IF NOT EXISTS postgis;

CREATE SCHEMA api;

CREATE TABLE api.driver (
	id UUID NOT NULL,
	name VARCHAR(30) NOT NULL,
	profile_picture VARCHAR(150) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE api.passenger (
	id UUID NOT NULL,
	name VARCHAR(30) NOT NULL,
	profile_picture VARCHAR(150) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE api.trip (
	id UUID NOT NULL,
	passenger_id UUID NOT NULL,
	driver_id UUID NOT NULL,
	start Point NOT NULL,
	destination Point NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE api.passenger_location (
	passenger_id UUID NOT NULL,
	timetoken VARCHAR(17) NOT NULL,
	current_location Point NOT NULL,
	PRIMARY KEY (passenger_id, timetoken),
	FOREIGN KEY (passenger_id) REFERENCES api.passenger (id)
);

CREATE TABLE api.driver_location (
	driver_id UUID NOT NULL,
	timetoken VARCHAR(17) NOT NULL,
	current_location Point NOT NULL,
	PRIMARY KEY (driver_id, timetoken),
	FOREIGN KEY (driver_id) REFERENCES api.driver (id)
);

CREATE OR REPLACE FUNCTION api.nearest_driver(p_passenger_id UUID)
RETURNS UUID AS $$
	SELECT driver_location.driver_id
	FROM driver_location, passenger_location
	WHERE passenger_location.passenger_id = p_passenger_id
	ORDER BY driver_location.current_location <-> passenger_location.current_location
	LIMIT 1
$$ LANGUAGE SQL IMMUTABLE SET search_path = public, api;

CREATE role web_anon nologin;
GRANT web_anon TO postgres;

GRANT USAGE ON SCHEMA api TO web_anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON api.driver TO web_anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON api.passenger TO web_anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON api.trip TO web_anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON api.passenger_location TO web_anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON api.driver_location TO web_anon;