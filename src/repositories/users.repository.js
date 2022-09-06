const Sequelize = require('sequelize');

const constantsHolder = require('../constants');
const { responseHandler } = require('../helpers');
const utils = require('../utils');
const {
  UsersModel,
  PostsModel,
  TagsModel,
  AnswersModel,
  CommentsModel,
} = require('../models');

exports.create = async (newUser) => await UsersModel
  .create({
    username: newUser.username,
    password: newUser.password,
    gravatar: constantsHolder.GRAVATAR_URL(utils.math.getRandomInt()),
  })
  .catch((error) => {
    console.log(error.message);
    throw new Error('Some error occurred while registering the user.');
  });

exports.retrieveAll = async (result) => {
  const queryResult = await UsersModel.findAll({
    distinct: true,
    attributes: [
      'id',
      'username',
      'gravatar',
      'views',
      'created_at',
      [Sequelize.literal('COUNT(DISTINCT(posts.id))'), 'posts_count'],
      [Sequelize.literal('COUNT(DISTINCT(tagname))'), 'tags_count'],
    ],
    include: [
      {
        model: PostsModel,
        attributes: [],
        required: false,
        include: {
          model: TagsModel,
          attributes: [],
          required: false,
        },
      },
    ],
    group: ['users.id'],
    order: [[Sequelize.col('posts_count'), 'DESC']],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const usersMap = queryResult.map((user) => utils.array.sequelizeResponse(
    user,
    'id',
    'username',
    'gravatar',
    'views',
    'created_at',
    'posts_count',
    'tags_count',
  ));

  if (utils.conditional.isArrayEmpty(usersMap)) {
    return result(responseHandler(false, 404, 'There are no users', null), null);
  }

  return result(null, responseHandler(true, 200, 'Success', usersMap));
};

exports.incrementViews = async (userId) => {
  await UsersModel.increment('views',
    {
      by: 1,
      where: { id: userId },
    })
    .catch((error) => {
      console.log('error: ', error);
      throw new Error('There isn\'t any user by this id');
    });
};

exports.retrieveOneWithCounts = async (id) => {
  let queryResult = await UsersModel.findOne({
    where: { id },
    attributes: [
      'id',
      'username',
      'gravatar',
      'views',
      'created_at',
      [Sequelize.literal('COUNT(DISTINCT(posts.id))'), 'posts_count'],
      [Sequelize.literal('COUNT(DISTINCT(tagname))'), 'tags_count'],
      [Sequelize.literal('COUNT(DISTINCT(answers.id))'), 'answers_count'],
      [Sequelize.literal('COUNT(DISTINCT(comments.id))'), 'comments_count'],
    ],
    include: [
      {
        required: false,
        model: PostsModel,
        attributes: [],
        include: {
          attributes: [],
          required: false,
          model: TagsModel,
        },
      },
      {
        attributes: [],
        required: false,
        model: AnswersModel,
      },
      {
        attributes: [],
        required: false,
        model: CommentsModel,
      },
    ],
    group: ['users.id'],
  })
    .catch((error) => {
      console.log(error);
      throw new Error('Something went wrong');
    });

  if (utils.conditional.isNull(queryResult)) {
    throw new Error('This user doesn\'t exists');
  }

  queryResult = utils.array.sequelizeResponse(
    queryResult,
    'id',
    'username',
    'gravatar',
    'views',
    'created_at',
    'posts_count',
    'tags_count',
    'answers_count',
    'comments_count',
  );

  return queryResult;
};

exports.retrieveOne = async (params) => await UsersModel
  .findOne({
    where: params,
  })
  .catch((error) => {
    console.log('error: ', error);
    throw new Error('User not found');
  });
