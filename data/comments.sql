-- CREATE
INSERT INTO comments(body,user_id,post_id) VALUES(?,?,?);

-- DELETE
DELETE FROM comments WHERE id = ?;

-- RETRIEVE ALL
SELECT 
  comments.id, 
  post_id, 
  comments.user_id, 
  username, 
  comments.body, 
  comments.created_at 
FROM 
  comments 
  JOIN posts ON posts.id = comments.post_id 
  JOIN users ON users.id = comments.user_id 
WHERE 
  post_id = ?;