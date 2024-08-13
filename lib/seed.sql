TRUNCATE TABLE whitelist, spotlights, board, projects, learning_resources;
DROP SEQUENCE IF EXISTS spotlights_seq, board_seq, projects_seq, learning_resources_seq;
DROP TABLE IF EXISTS whitelist, spotlights, board, projects, learning_resources;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS whitelist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS spotlights_seq;
CREATE TABLE IF NOT EXISTS spotlights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  images TEXT[] NOT NULL,
  pos NUMERIC NOT NULL DEFAULT nextval('spotlights_seq'),
);

CREATE SEQUENCE IF NOT EXISTS board_seq;
CREATE TABLE IF NOT EXISTS board (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  linkedin VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  pos NUMERIC NOT NULL DEFAULT nextval('board_seq'),
);

CREATE SEQUENCE IF NOT EXISTS projects_seq;
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  pos NUMERIC NOT NULL DEFAULT nextval('projects_seq'),
);

CREATE SEQUENCE IF NOT EXISTS learning_resources_seq;
CREATE TABLE IF NOT EXISTS learning_resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL,
  pos NUMERIC NOT NULL DEFAULT nextval('learning_resources_seq'),
);

CREATE OR REPLACE FUNCTION resequence_spotlights_pos()
RETURNS TRIGGER AS $$
BEGIN
    IF LENGTH(NEW.pos::TEXT) > 12 THEN
        WITH Ordered AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY pos) AS NewPos
            FROM spotlights
        )
        UPDATE spotlights s
        SET pos = o.NewPos
        FROM Ordered o
        WHERE s.id = o.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_spotlights_pos_after_update
AFTER UPDATE ON spotlights
FOR EACH ROW
EXECUTE FUNCTION resequence_spotlights_pos();

CREATE OR REPLACE FUNCTION resequence_board_pos()
RETURNS TRIGGER AS $$
BEGIN
    IF LENGTH(NEW.pos::TEXT) > 12 THEN
        WITH Ordered AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY pos) AS NewPos
            FROM board
        )
        UPDATE board b
        SET pos = o.NewPos
        FROM Ordered o
        WHERE b.id = o.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_board_pos_after_update
AFTER UPDATE ON board
FOR EACH ROW
EXECUTE FUNCTION resequence_board_pos();

CREATE OR REPLACE FUNCTION resequence_projects_pos()
RETURNS TRIGGER AS $$
BEGIN
    IF LENGTH(NEW.pos::TEXT) > 12 THEN
        WITH Ordered AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY pos) AS NewPos
            FROM projects
        )
        UPDATE projects p
        SET pos = o.NewPos
        FROM Ordered o
        WHERE p.id = o.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_projects_pos_after_update
AFTER UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION resequence_projects_pos();

CREATE OR REPLACE FUNCTION resequence_learning_resources_pos()
RETURNS TRIGGER AS $$
BEGIN
    IF LENGTH(NEW.pos::TEXT) > 12 THEN
        WITH Ordered AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY pos) AS NewPos
            FROM learning_resources
        )
        UPDATE learning_resources lr
        SET pos = o.NewPos
        FROM Ordered o
        WHERE lr.id = o.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_learning_resources_pos_after_update
AFTER UPDATE ON learning_resources
FOR EACH ROW
EXECUTE FUNCTION resequence_learning_resources_pos();
