const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const constantsHolder = require('../constants');
const {
  responseHandler,
  calcHelper,
  conditionalHelper,
  getJwtToken,
  format,
} = require('../helpers');
const {
  UsersModelSequelize,
  PostsModelSequelize,
  TagsModelSequelize,
  AnswersModelSequelize,
  CommentsModelSequelize,
} = require('../models');

exports.register = async (newUser, result) => {
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await UsersModelSequelize.create({
    username: newUser.username,
    password: newUser.password,
    gravatar: constantsHolder.GRAVATAR_URL(calcHelper.getRandomInt()),
  })
    .then((response) => {
      const payload = {
        user: {
          id: response.id,
        },
      };

      getJwtToken(payload, 'User registered', result);

      return payload;
    })
    .catch((error) => {
      console.log(error.message);
      result(responseHandler(false, 500, 'Some error occurred while registering the user.', null), null);
      return null;
    });
};

exports.login = async (newUser, result) => {
  const user = await UsersModelSequelize.findOne({
    where: {
      username: newUser.username,
    },
  })
    .catch((error) => {
      console.log(error.message);
      result(
        responseHandler(false, 500, 'Some error occurred while logging in the user.', null),
        null,
      );
      return null;
    });

  if (user === null) {
    result(
      responseHandler(
        false,
        404,
        'User does not exists',
        null,
      ),
      null,
    );
    return null;
  }

  const isMatch = await bcrypt.compare(newUser.password, user.password);

  if (!isMatch) {
    result(
      responseHandler(false, 400, 'Incorrect password', null),
      null,
    );

    return null;
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  getJwtToken(payload, 'User logged in', result);

  return payload;
};

exports.retrieveAll = async (result) => {
  const queryResult = await UsersModelSequelize.findAll({
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
        model: PostsModelSequelize,
        attributes: [],
        required: true,
        include: {
          model: TagsModelSequelize,
          attributes: [],
          required: true,
        },
      },
    ],
    group: ['users.id'],
    order: [[Sequelize.col('posts_count'), 'DESC']],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const usersMap = queryResult.map((user) => format.sequelizeResponse(
    user,
    'id',
    'username',
    'gravatar',
    'views',
    'created_at',
    'posts_count',
    'tags_count',
  ));

  if (conditionalHelper.isArrayEmpty(usersMap)) {
    return result(responseHandler(false, 404, 'There are no users', null), null);
  }

  return result(null, responseHandler(true, 200, 'Success', usersMap));
};

exports.retrieveOne = async (id, result) => {
  await UsersModelSequelize.increment('views',
    {
      by: 1,
      where: { id },
    })
    .catch((error) => {
      console.log('error: ', error);
      return result(
        responseHandler(
          false,
          error ? error.statusCode : 404,
          error ? error.message : 'There isn\'t any user by this id',
          null,
        ),
        null,
      );
    });

  let queryResult = await UsersModelSequelize.findOne({
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
        required: true,
        model: PostsModelSequelize,
        attributes: [],
        include: {
          attributes: [],
          required: true,
          model: TagsModelSequelize,
        },
      },
      {
        attributes: [],
        required: false,
        model: AnswersModelSequelize,
      },
      {
        attributes: [],
        required: false,
        model: CommentsModelSequelize,
      },
    ],
    group: ['users.id'],
  })
    .catch((error) => {
      console.log(error);
      return result(responseHandler(false, 500, 'Something went wrong', null), null);
    });

  if (conditionalHelper.isNull(queryResult)) {
    return result(responseHandler(false, 404, 'This user doesn\'t exists', null), null);
  }

  queryResult = format.sequelizeResponse(
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

  return result(null, responseHandler(true, 200, 'Success', queryResult));
};

exports.loadUser = async (userId, result) => {
  await UsersModelSequelize.findOne({
    where: { id: userId },
    attributes: ['id', 'username', 'gravatar', 'views', 'created_at'],
  })
    .then((response) => {
      result(null, responseHandler(true, 200, 'Success', response));
    }).catch((error) => {
      console.log('error: ', error);
      result(responseHandler(false, error.statusCode, 'User not found', null), null);
    });
};
