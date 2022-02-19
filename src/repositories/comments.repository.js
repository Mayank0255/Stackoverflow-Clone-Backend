const responseHandler = require('../helpers/responseHandler');
const { CommentsModelSequelize } = require('../models/sequelize');

exports.create = async (newComment, result) => {
  await CommentsModelSequelize.create({
    body: newComment.body,
    user_id: newComment.user_id,
    post_id: newComment.post_id,
  })
    .then((response) => {
      result(
        null,
        responseHandler(true, 200, 'Comment Added', response.id),
      );
    })
    .catch((error) => {
      console.log(error.message);
      result(responseHandler(false, 500, 'Some error occurred while adding the comment.', null), null);
    });
};

exports.remove = async (id, result) => {
  await CommentsModelSequelize.destroy({
    where: { id },
  })
    .then(() => {
      result(null, responseHandler(true, 200, 'Comment Removed', null));
    })
    .catch((error) => {
      console.log(error.message);
      result(responseHandler(false, 404, 'This comment doesn\'t exists', null), null);
    });
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
    INNER JOIN users ON users.id = comments.user_id 
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
