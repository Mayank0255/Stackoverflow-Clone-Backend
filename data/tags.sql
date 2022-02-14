-- RETRIEVE ONE
SELECT 
  tags.id, 
  posts.id, 
  tagname, 
  description, 
  COUNT(DISTINCT posts.id) as posts_count, 
  tags.created_at 
FROM 
  tags 
  LEFT JOIN posttag ON posttag.tag_id = tags.id 
  LEFT JOIN posts ON posts.id = posttag.post_id 
GROUP BY 
  tags.id 
ORDER BY 
  posts_count DESC;

-- RETRIEVE ALL
SELECT 
  tags.id, 
  posts.id, 
  description, 
  tagname, 
  COUNT(DISTINCT posts.id) as posts_count, 
  tags.created_at 
FROM 
  tags 
  LEFT JOIN posttag ON posttag.tag_id = tags.id 
  LEFT JOIN posts ON posts.id = posttag.post_id 
WHERE 
  tagname = ? 
GROUP BY 
  tags.id;
