--
-- TABLE Creation SQL commands
--

-- users
CREATE TABLE users (
    u_id SMALLSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    city VARCHAR(48) NOT NULL,
    state VARCHAR(30) NOT NULL,
    c_count SMALLINT NOT NULL -- should be no more than 100
);

-- Creatives 
CREATE TABLE creatives (
    c_id SMALLSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) UNIQUE NOT NULL,
    type VARCHAR(30) NOT NULL,
    u_count SMALLINT NOT NULL
);

-- events
CREATE TABLE  events (
    e_id SMALLSERIAL PRIMARY KEY NOT NULL,
    venue VARCHAR(30),
    s_date TIMESTAMPTZ NOT NULL,
    ticket_date TIMESTAMPTZ,
    ticket_state SMALLINT NOT NULL, -- 1 for sale upcoming, 2 for on sale now, 3 for sold out
    c_id SMALLINT NOT NULL REFERENCES creatives(c_id),
    e_url VARCHAR(128) NOT NULL
);

-- Users_events
CREATE TABLE user_events (
    u_id SMALLSERIAL NOT NULL REFERENCES users(u_id),
    e_id SMALLSERIAL NOT NULL REFERENCES events(e_id),
    PRIMARY KEY(u_id, e_id)
);

-- User_creatives
CREATE TABLE user_creatives (
    u_id SMALLSERIAL NOT NULL REFERENCES users(u_id),
    c_id SMALLSERIAL NOT NULL REFERENCES creatives(c_id),
    PRIMARY KEY(u_id, c_id)
);

GRANT ALL ON user_creatives TO api
GRANT ALL ON creatives TO api
GRANT ALL ON users TO api

-- TRIGGERS --
-- check triggers with \dft
-- see triggers attached to tables with  \dS <table name>
-- user_creatives Insert trigger
CREATE FUNCTION inc_counts()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	UPDATE users SET c_count = c_count + 1 WHERE u_id = OLD.u_id;
	UPDATE creatives SET u_count = u_count + 1 WHERE c_id = OLD.u_id;
	RETURN NEW;
END;
$$

CREATE TRIGGER inc_on_user_creatives_insert 
  AFTER INSERT 
  ON user_creatives
  FOR EACH ROW
    EXECUTE PROCEDURE inc_counts();

-- user_creatives delete trigger
CREATE FUNCTION dec_counts()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	UPDATE users SET c_count = c_count - 1 WHERE u_id = OLD.u_id;
	UPDATE creatives SET u_count = u_count - 1 WHERE c_id = OLD.u_id;
	RETURN NEW;
END;
$$

CREATE TRIGGER dec_on_user_creatives_insert
  AFTER DELETE
  ON user_creatives
  FOR EACH ROW
  EXECUTE PROCEDURE dec_counts();

-- Test Triggers
CREATE FUNCTION test()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	UPDATE creatives SET VALUES ('JUNK', 'JUNK', 0);
END;
$$

CREATE TRIGGER test_trigger
  AFTER INSERT
  ON creatives
  FOR EACH ROW
  EXECUTE PROCEDURE test();