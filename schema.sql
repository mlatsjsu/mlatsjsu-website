-- Marketing site schema
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

-- Forum schema
-- Verification_token, accounts, sessions, and users table from
-- https://authjs.dev/getting-started/adapters/pg
DROP TABLE IF EXISTS verification_token, accounts, sessions, users, posts, reading_lists, users_topics, posts_topics, topics, follows, post_likes, comments, comment_likes;

CREATE TABLE verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  PRIMARY KEY (identifier, token)
);

CREATE TABLE accounts
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE sessions
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  image TEXT,
  bio TEXT,
  link TEXT,
  "emailVerified" TIMESTAMPTZ,
  register_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  follower_count INT DEFAULT 0,
  following_count INT DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    content_url TEXT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    user_id SERIAL NOT NULL,
    published_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reading_lists (
    user_id SERIAL,
    post_id UUID,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE topics (
  topic_name VARCHAR(20) PRIMARY KEY,
  post_count INT DEFAULT 0
);

CREATE TABLE users_topics (
    user_id SERIAL,
    topic_name VARCHAR(20),
    PRIMARY KEY (user_id, topic_name),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_name) REFERENCES topics(topic_name) ON DELETE CASCADE
);

CREATE TABLE posts_topics (
    post_id UUID,
    topic_name VARCHAR(20),
    PRIMARY KEY (post_id, topic_name),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_name) REFERENCES topics(topic_name) ON DELETE CASCADE
);

CREATE TABLE follows (
    follower_id SERIAL,
    following_id SERIAL,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE post_likes (
    post_id UUID,
    user_id SERIAL,
    liked_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    post_id UUID NOT NULL,
    user_id SERIAL NOT NULL,
    comment_ref_id UUID,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_ref_id) REFERENCES comments(id) ON DELETE CASCADE
);

CREATE TABLE comment_likes (
    post_id UUID,
    comment_id UUID,
    user_id SERIAL,
    liked_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, comment_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION remove_from_reading_lists()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.is_published IS TRUE AND NEW.is_published IS FALSE THEN
        DELETE FROM reading_lists WHERE post_id = OLD.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_unpublish_post
AFTER UPDATE OF is_published ON posts
FOR EACH ROW
EXECUTE FUNCTION remove_from_reading_lists();

-- Increment like_count when a like is added
CREATE OR REPLACE FUNCTION increment_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_post_like
AFTER INSERT ON post_likes
FOR EACH ROW
EXECUTE FUNCTION increment_post_like_count();

-- Decrement like_count when a like is removed
CREATE OR REPLACE FUNCTION decrement_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET like_count = like_count - 1 WHERE id = OLD.post_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_decrement_post_like
AFTER DELETE ON post_likes
FOR EACH ROW
EXECUTE FUNCTION decrement_post_like_count();

-- Increment like_count for comments
CREATE OR REPLACE FUNCTION increment_comment_like_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE comments SET like_count = like_count + 1 WHERE id = NEW.comment_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_comment_like
AFTER INSERT ON comment_likes
FOR EACH ROW
EXECUTE FUNCTION increment_comment_like_count();

-- Decrement like_count for comments
CREATE OR REPLACE FUNCTION decrement_comment_like_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE comments SET like_count = like_count - 1 WHERE id = OLD.comment_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_decrement_comment_like
AFTER DELETE ON comment_likes
FOR EACH ROW
EXECUTE FUNCTION decrement_comment_like_count();
