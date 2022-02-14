-- CREATE
INSERT INTO answers(body,user_id,post_id) VALUES(?,?,?);

-- DELETE
DELETE FROM answers WHERE id = ?;

-- RETRIEVE ALL
SELECT 
  answers.id, 
  post_id, 
  answers.user_id, 
  username, 
  answers.body, 
  answers.created_at 
FROM 
  answers 
  JOIN posts ON posts.id = post_id 
  JOIN users ON users.id = answers.user_id 
WHERE 
  post_id = ?;