const sequelize = require('sequelize');
const { responseHandler, conditionalHelper } = require('../helpers');
const { CommentsModelSequelize, UsersModelSequelize } = require('../models');

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

exports.retrieveAll = async (postId, result) => {
  const queryResult = await CommentsModelSequelize.findAll({
    where: {
      post_id: postId,
    },
    attributes: ['id', 'user_id', 'post_id', 'body', 'created_at', [sequelize.literal('user.username'), 'username']],
    include: {
      model: UsersModelSequelize,
      attributes: [],
    },
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if (conditionalHelper.isArrayEmpty(queryResult)) {
    console.log('error: ', 'There are no comments');
    return result(responseHandler(false, 404, 'There are no comments', null), null);
  }

  return result(null, responseHandler(true, 200, 'Success', queryResult));
};
