CREATE DATABASE stack_overflow;

USE stack_overflow;

CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NULL,
  password VARCHAR(100),
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(250),
  body MEDIUMTEXT,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  user_id INT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE answers(
  id INT AUTO_INCREMENT PRIMARY KEY,
  body MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  post_id INT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(id),
  user_id INT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE comments(
  id INT AUTO_INCREMENT PRIMARY KEY,
  body MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  post_id INT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(id),
  user_id INT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE tags(
  id INT AUTO_INCREMENT PRIMARY KEY,
  tagname VARCHAR(255) UNIQUE,
  description MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posttag(
  post_id INT NOT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(id),
  tag_id INT NOT NULL,
  FOREIGN KEY(tag_id) REFERENCES tags(id),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(post_id, tag_id)
);