-- REGISTER
INSERT INTO users(username,password) VALUES(?,?);

-- LOGIN
SELECT * FROM users WHERE username = ?;

-- RETRIEVE ALL
SELECT 
  users.id, 
  username, 
  users.created_at, 
  users.views, 
  COUNT(DISTINCT posts.id) as posts_count, 
  COUNT(DISTINCT tagname) as tags_count 
FROM 
  users 
  LEFT JOIN posts ON posts.user_id = users.id 
  LEFT JOIN posttag ON posttag.post_id = posts.id 
  LEFT JOIN tags ON posttag.tag_id = tags.id 
GROUP BY 
  users.id 
ORDER BY 
  posts_count DESC;

-- RETRIEVE ONE
UPDATE users SET views = views + 1 WHERE users.id = ?;

SELECT 
    users.id, 
    username, 
    users.created_at, 
    users.views, 
    COUNT(DISTINCT posts.id) as post_count, 
    COUNT(DISTINCT tagname) as tag_count, 
    COUNT(DISTINCT answers.id) as answer_count, 
    COUNT(DISTINCT comments.id) as comment_count 
  FROM 
    users 
    LEFT JOIN posts ON posts.user_id = users.id 
    LEFT JOIN posttag ON posttag.post_id = posts.id 
    LEFT JOIN tags ON posttag.tag_id = tags.id 
    LEFT JOIN answers ON answers.user_id = users.id 
    LEFT JOIN comments ON comments.user_id = users.id 
  WHERE 
    users.id = ? 
  GROUP BY 
    users.id;

-- LOAD USER
SELECT id,username,created_at FROM users WHERE id = ?;