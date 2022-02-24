const { responseHandler } = require('../helpers');
const { PostsModelSequelize, AnswersModelSequelize, CommentsModelSequelize } = require('../models');

const checkOwnership = async (req, res, next) => {
  let Model;
  if (req.originalUrl.includes('posts')) {
    if (req.originalUrl.includes('answers')) {
      Model = AnswersModelSequelize;
    } else if (req.originalUrl.includes('comments')) {
      Model = CommentsModelSequelize;
    } else {
      Model = PostsModelSequelize;
    }
  } else {
    next();
  }

  const user = await Model
    .findOne({
      where: { id: req.params.id },
      attributes: ['user_id'],
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .json(responseHandler(false, 500, 'Something went wrong', null));
    });

  if (user === null) {
    return res
      .status(404)
      .json(responseHandler(false, 404, 'User doesn\'t exists', null));
  }

  if (user.user_id !== req.user.id) {
    console.log('error: User not authorized to delete');
    return res.json(
      responseHandler(
        false,
        401,
        'User not authorized to delete',
        null,
      ),
    );
  }

  next();
};

module.exports = checkOwnership;
