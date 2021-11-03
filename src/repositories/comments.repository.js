const helperFunction = require('../helpers/helperFunction');

const create = (newComment, result) => {
  const query = `INSERT INTO comments(body,user_id,post_id) VALUES(?,?,?);`;

  pool.query(
    query,
    [newComment.body, newComment.user_id, newComment.post_id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(
          helperFunction.responseHandler(
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
        helperFunction.responseHandler(true, 200, 'Comment Added', res.insertId),
      );
    },
  );
};

const remove = (id, result) => {
  const query = ` DELETE FROM comments WHERE id = ?;`;

  pool.query(query, id, (err) => {
    if (err) {
      console.log('error: ', err);
      result(
        helperFunction.responseHandler(
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
      helperFunction.responseHandler(true, 200, 'Comment Removed', null),
    );
  });
};

const retrieveAll = (postId, result) => {
  const query = `   SELECT
                    comments.id, post_id, comments.user_id, username, comments.body, comments.created_at 
                    FROM comments 
                    JOIN posts ON posts.id = comments.post_id 
                    JOIN users ON users.id = comments.user_id 
                    WHERE post_id = ?;`;

  pool.query(query, postId, (err, results) => {
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        helperFunction.responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There are no comments',
          null,
        ),
        null,
      );
      return;
    }
    result(null, helperFunction.responseHandler(true, 200, 'Success', results));
  });
};

module.exports = {
  create,
  remove,
  retrieveAll,
};
