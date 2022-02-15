const responseHandler = require('../helpers/responseHandler');
const { CommentsModelSequelize } = require('../models/comments.model');

exports.create = (newComment, result) => {
  const query = `INSERT INTO comments(body,user_id,post_id) VALUES(?,?,?);`;

  pool.query(
    query,
    [newComment.body, newComment.user_id, newComment.post_id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(
          responseHandler(
            false,
            err.statusCode,
            err.message,
            null,
          ),
          null,
        );
        return;
      }
      result(
        null,
        responseHandler(true, 200, 'Comment Added', res.insertId),
      );
    },
  );
};

exports.remove = async (id, result) => {
  const queryResult = await CommentsModelSequelize.destroy({
    where: { id },
  });

  if (queryResult === 1) {
    result(null, responseHandler(true, 200, 'Comment Removed', null));
  } else {
    result(responseHandler(false, 404, 'This comment doesn\'t exists', null), null);
  }
};

exports.retrieveAll = (postId, result) => {
  const query = `
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
    post_id = ?;`;

  pool.query(query, postId, (err, results) => {
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There are no comments',
          null,
        ),
        null,
      );
      return;
    }
    result(null, responseHandler(true, 200, 'Success', results));
  });
};
