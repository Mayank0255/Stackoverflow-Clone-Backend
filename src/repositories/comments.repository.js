const sequelize = require('sequelize');
const utils = require('../utils');
const { responseHandler } = require('../helpers');
const { CommentsModel, UsersModel } = require('../models');

exports.create = async (newComment, result) => {
  await CommentsModel.create({
    body: newComment.body,
    user_id: newComment.userId,
    post_id: newComment.postId,
  })
    .then((response) => {
      result(
        null,
        responseHandler(true, 200, 'Comment Added', response.id),
      );
    })
    .catch((error) => {
      console.log(error);
      result(responseHandler(false, 500, 'Some error occurred while adding the comment.', null), null);
    });
};

exports.remove = async (id, result) => {
  await CommentsModel.destroy({
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

exports.removePostComments = async (postId, t) => {
  await CommentsModel
    .destroy({ where: { post_id: postId } }, { transaction: t })
    .then(() => ({ status: true, message: 'Comment Removed' }))
    .catch((error) => {
      throw new Error(`Comment Delete Operation Failed: ${error}`);
    });
};

exports.retrieveAll = async (postId, result) => {
  const queryResult = await CommentsModel.findAll({
    where: {
      post_id: postId,
    },
    attributes: ['id', 'user_id', 'post_id', 'body', 'created_at', [sequelize.literal('user.username'), 'username']],
    include: {
      model: UsersModel,
      attributes: [],
    },
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const queryResultMap = queryResult.map((answer) => utils.array.sequelizeResponse(
    answer,
    'id',
    'user_id',
    'post_id',
    'body',
    'created_at',
    'username',
  ));

  if (utils.conditional.isArrayEmpty(queryResultMap)) {
    console.log('error: ', 'There are no comments');
    return result(responseHandler(false, 404, 'There are no comments', null), null);
  }

  return result(null, responseHandler(true, 200, 'Success', queryResultMap));
};
