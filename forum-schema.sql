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
