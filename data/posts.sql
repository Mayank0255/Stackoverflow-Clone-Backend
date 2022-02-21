-- CREATE
INSERT INTO posts(title,body,user_id) VALUES (?,?,?);
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES (?, ?);
SET @v2 := (SELECT id FROM tags WHERE tagname = ?);
INSERT INTO posttag(post_id,tag_id) VALUES(@v1,@v2);

-- DELETE
DELETE FROM posttag WHERE post_id = ?;
DELETE FROM comments WHERE post_id = ?; 
DELETE FROM answers WHERE post_id = ?; 
DELETE FROM posts WHERE id = ? ;

-- RETRIEVE ONE 
UPDATE posts SET views = views + 1 WHERE posts.id = ?;

SELECT 
  posts.id, 
  posts.user_id, 
  tag_id, 
  COUNT(DISTINCT answers.id) as answer_count, 
  COUNT(DISTINCT comments.id) as comment_count, 
  username, 
  title, 
  posts.body as post_body, 
  tagname, 
  posts.created_at, 
  posts.views as views 
FROM 
  posts 
  JOIN posttag ON posts.id = post_id 
  JOIN tags ON tag_id = tags.id 
  JOIN users ON user_id = users.id 
  LEFT JOIN answers ON answers.post_id = posts.id 
  LEFT JOIN comments ON posts.id = comments.post_id 
WHERE 
  posts.id = ?;

-- RETRIEVE ALL
SELECT 
  posts.id, 
  posts.user_id, 
  username, 
  COUNT(DISTINCT answers.id) as answer_count, 
  COUNT(DISTINCT comments.id) as comment_count, 
  tag_id, 
  title, 
  posts.body, 
  tagname, 
  description, 
  posts.created_at, 
  posts.views 
FROM 
  posts 
  JOIN posttag ON posts.id = post_id 
  JOIN tags ON tag_id = tags.id 
  JOIN users ON user_id = users.id 
  LEFT JOIN answers ON answers.post_id = posts.id 
  LEFT JOIN comments ON posts.id = comments.post_id 
GROUP BY 
  posts.id 
ORDER BY 
  posts.created_at DESC;

-- RETRIEVE ALL TOP
SELECT 
  posts.id, 
  posts.user_id, 
  username, 
  COUNT(DISTINCT answers.id) as answer_count, 
  COUNT(DISTINCT comments.id) as comment_count, 
  tag_id, 
  title, 
  posts.body, 
  tagname, 
  description, 
  posts.created_at, 
  posts.views 
FROM 
  posts 
  JOIN posttag ON posts.id = post_id 
  JOIN tags ON tag_id = tags.id 
  JOIN users ON user_id = users.id 
  LEFT JOIN answers ON answers.post_id = posts.id 
  LEFT JOIN comments ON posts.id = comments.post_id 
GROUP BY 
  posts.id 
ORDER BY 
  answer_count DESC, 
  comment_count DESC;

-- RETREIVE ALL TAG
SELECT 
  posts.id, 
  posts.user_id, 
  username, 
  COUNT(DISTINCT answers.id) as answer_count, 
  COUNT(DISTINCT comments.id) as comment_count, 
  tag_id, 
  title, 
  posts.body, 
  tagname, 
  description, 
  posts.created_at, 
  posts.views 
FROM 
  posts 
  JOIN posttag ON posts.id = post_id 
  JOIN tags ON tag_id = tags.id 
  JOIN users ON user_id = users.id 
  LEFT JOIN answers ON answers.post_id = posts.id 
  LEFT JOIN comments ON posts.id = comments.post_id 
WHERE 
  tags.tagname = ? 
GROUP BY 
  posts.id 
ORDER BY 
  posts.created_at DESC;