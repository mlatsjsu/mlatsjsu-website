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
  UNIQUE(pos)
);

CREATE SEQUENCE IF NOT EXISTS board_seq;
CREATE TABLE IF NOT EXISTS board (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  linkedin VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  pos NUMERIC NOT NULL DEFAULT nextval('board_seq'),
  UNIQUE(pos)
);

CREATE SEQUENCE IF NOT EXISTS projects_seq;
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  pos NUMERIC NOT NULL DEFAULT nextval('projects_seq'),
  UNIQUE(pos)
);

CREATE SEQUENCE IF NOT EXISTS learning_resources_seq;
CREATE TABLE IF NOT EXISTS learning_resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL,
  pos NUMERIC NOT NULL DEFAULT nextval('learning_resources_seq'),
  UNIQUE(pos)
);
