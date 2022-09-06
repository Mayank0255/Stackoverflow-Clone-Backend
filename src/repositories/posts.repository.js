const Sequelize = require('sequelize');
const utils = require('../utils');
const { responseHandler } = require('../helpers');
const {
  PostsModel,
  TagsModel,
  AnswersModel,
  CommentsModel,
  UsersModel,
} = require('../models');

exports.create = async (newPost, result) => await PostsModel
  .create({
    title: newPost.title,
    body: newPost.body,
    user_id: newPost.userId,
  })
  .catch((error) => {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    return null;
  });

exports.remove = async (postId, t) => {
  await PostsModel
    .destroy({ where: { id: postId } }, { transaction: t })
    .then(() => ({ status: true, message: 'Post Removed' }))
    .catch((error) => {
      console.log(error);
      throw new Error(`Post Delete Operation Failed: ${error}`);
    });
};

exports.incrementViews = async (postId) => {
  await PostsModel.increment('views',
    {
      by: 1,
      where: { id: postId },
    })
    .catch((error) => {
      console.log('error: ', error);
      throw new Error('There isn\'t any post by this id');
    });
};

exports.retrieveOne = async (postId) => {
  let queryResult = await PostsModel.findOne({
    distinct: true,
    where: {
      id: postId,
    },
    attributes: [
      'id',
      'user_id',
      [Sequelize.literal('user.gravatar'), 'gravatar'],
      [Sequelize.literal('user.username'), 'username'],
      'title',
      ['body', 'post_body'],
      'created_at',
      'updated_at',
      'views',
    ],
    include: [
      {
        model: TagsModel,
        required: false,
        attributes: ['id', 'tagname'],
      },
      {
        model: UsersModel,
        required: false,
        attributes: [],
      },
    ],
  }).catch((error) => {
    console.log(error);
    throw new Error('Something went wrong!');
  });

  if (utils.conditional.isNull(queryResult)) {
    throw new Error('There isn\'t any post by this id');
  }

  queryResult = utils.array.sequelizeResponse(
    queryResult,
    'id',
    'user_id',
    'gravatar',
    'username',
    'title',
    'post_body',
    'created_at',
    'updated_at',
    'views',
    'tags',
  );

  return queryResult;
};

exports.retrieveAll = async (tagName = '') => {
  const query = {
    distinct: true,
    attributes: [
      'id',
      'user_id',
      'views',
      [Sequelize.literal('user.username'), 'username'],
      [Sequelize.literal('user.gravatar'), 'gravatar'],
      'created_at',
      'updated_at',
      'title',
      'body',
    ],
    include: [
      {
        model: TagsModel,
        required: false,
        attributes: ['id', 'tagname'],
      },
      {
        model: UsersModel,
        required: false,
        attributes: [],
      },
    ],
    order: [['created_at', 'DESC']],
  };

  if (tagName !== '') {
    query.where = {
      '$tags.tagname$': tagName,
    };
  }

  const posts = await PostsModel
    .findAll(query)
    .catch((error) => {
      console.log(error);
      throw new Error('Something went wrong!');
    });

  const postsMap = posts.map((post) => utils.array.sequelizeResponse(
    post,
    'id',
    'user_id',
    'views',
    'title',
    'body',
    'tags',
    'username',
    'gravatar',
    'created_at',
    'updated_at',
  ));

  if (utils.conditional.isArrayEmpty(postsMap)) {
    throw new Error('There are no posts');
  }

  return postsMap;
};

exports.countCommentsForOne = async (postId) => await PostsModel.count({
  where: {
    id: postId,
  },
  include: {
    model: CommentsModel,
    required: false,
    attributes: [],
  },
}).catch((error) => {
  console.log(error);
  return result(responseHandler(false, 500, 'Something went wrong!', null), null);
});

exports.countAnswersForOne = async (postId) => await PostsModel.count({
  where: {
    id: postId,
  },
  include: {
    model: AnswersModel,
    required: false,
    attributes: [],
  },
}).catch((error) => {
  console.log(error);
  return result(responseHandler(false, 500, 'Something went wrong!', null), null);
});

exports.countForAll = async (tagName = '') => {
  const req = {
    distinct: true,
    attributes: [
      'id',
      [Sequelize.literal('COUNT(DISTINCT(answers.id))'), 'answer_count'],
      [Sequelize.literal('COUNT(DISTINCT(comments.id))'), 'comment_count'],
    ],
    include: [
      {
        model: AnswersModel,
        required: false,
        attributes: [],
      },
      {
        model: CommentsModel,
        required: false,
        attributes: [],
      },
    ],
    group: ['id'],
    order: [['created_at', 'DESC']],
  };

  if (tagName !== '') {
    req.where = {
      '$tags.tagname$': tagName,
    };

    req.include.push({
      model: TagsModel,
      required: false,
      attributes: [],
    });
  }

  return await PostsModel
    .findAll(req)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
