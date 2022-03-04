const Sequelize = require('sequelize');
const Serializer = require('sequelize-to-json');
const db = require('../config/db.config');
const { responseHandler, conditionalHelper, investApi } = require('../helpers');
const {
  PostsModelSequelize,
  PostTagModelSequelize,
  TagsModelSequelize,
  AnswersModelSequelize,
  CommentsModelSequelize, UsersModelSequelize,
} = require('../models');

exports.create = async (newPost, result) => {
  let transaction;
  try {
    transaction = await db.transaction();

    const post = await PostsModelSequelize.create({
      title: newPost.title,
      body: newPost.body,
      user_id: newPost.userId,
    })
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });

    const tags = newPost.tagName.split(',').map((item) => item.trim());

    // eslint-disable-next-line no-restricted-syntax
    for (const item of tags) {
      // eslint-disable-next-line no-await-in-loop
      const tagDescription = await investApi.fetchTagDesc(item);

      // eslint-disable-next-line no-await-in-loop
      const [tag] = await TagsModelSequelize.findOrCreate({
        where: {
          tagname: item,
        },
        defaults: {
          tagname: item,
          description: tagDescription,
        },
      })
        .catch((error) => {
          console.log(error);
          result(responseHandler(false, 500, 'Something went wrong', null), null);
          return null;
        });

      // eslint-disable-next-line no-await-in-loop
      await PostTagModelSequelize.create({
        post_id: post.id,
        tag_id: tag.id,
      })
        .catch((error) => {
          console.log(error);
          result(responseHandler(false, 500, 'Something went wrong', null), null);
          return null;
        });
    }

    result(
      null,
      responseHandler(true, 200, 'Post Created', post.id),
    );

    await transaction.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if (transaction) {
      await transaction.rollback();
    }
  }
};

exports.remove = async (id, result) => {
  let transaction;

  try {
    transaction = await db.transaction();

    await PostTagModelSequelize.destroy({ where: { post_id: id } });

    await AnswersModelSequelize.destroy({ where: { post_id: id } });

    await CommentsModelSequelize.destroy({ where: { post_id: id } });

    await PostsModelSequelize.destroy({ where: { id } });

    result(
      null,
      responseHandler(true, 200, 'Post Removed', null),
    );

    await transaction.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if (transaction) {
      await transaction.rollback();
    }
  }
};

exports.retrieveOne = async (postId, result) => {
  await PostsModelSequelize.increment('views',
    {
      by: 1,
      where: { id: postId },
    })
    .catch((error) => {
      console.log('error: ', error);
      return result(
        responseHandler(
          false,
          error ? error.statusCode : 404,
          error ? error.message : 'There isn\'t any post by this id',
          null,
        ),
        null,
      );
    });

  const queryResult = await PostsModelSequelize.findOne({
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
        model: TagsModelSequelize,
        required: true,
        attributes: ['id', 'tagname'],
      },
      {
        model: UsersModelSequelize,
        required: true,
        attributes: [],
      },
    ],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const answersCount = await PostsModelSequelize.count({
    where: {
      id: postId,
    },
    include: {
      model: AnswersModelSequelize,
      required: true,
      attributes: [],
    },
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const commentsCount = await PostsModelSequelize.count({
    where: {
      id: postId,
    },
    include: {
      model: CommentsModelSequelize,
      required: true,
      attributes: [],
    },
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if (conditionalHelper.isNull(queryResult)) {
    return result(responseHandler(false, 404, 'There isn\'t any post by this id', null), null);
  }

  const response = {
    answer_count: answersCount,
    comment_count: commentsCount,
    ...queryResult.dataValues,
  };

  return result(null, responseHandler(true, 200, 'Success', response));
};

exports.retrieveAll = async (result) => {
  const posts = await PostsModelSequelize.findAll({
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
        model: TagsModelSequelize,
        required: true,
        attributes: ['id', 'tagname'],
      },
      {
        model: UsersModelSequelize,
        required: true,
        attributes: [],
      },
    ],
    order: [['created_at', 'DESC']],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const postCounts = await PostsModelSequelize.findAll({
    distinct: true,
    attributes: [
      [Sequelize.literal('COUNT(DISTINCT(answers.id))'), 'answer_count'],
      [Sequelize.literal('COUNT(DISTINCT(comments.id))'), 'comment_count'],
    ],
    include: [
      {
        model: AnswersModelSequelize,
        required: false,
        attributes: [],
      },
      {
        model: CommentsModelSequelize,
        required: false,
        attributes: [],
      },
    ],
    group: ['id'],
    order: [['created_at', 'DESC']],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if (conditionalHelper.isArrayEmpty(posts)) {
    return result(responseHandler(false, 404, 'There are no posts', null), null);
  }

  const response = [];
  posts.forEach((post, index) => {
    const counts = postCounts[index].dataValues;
    const postFormatted = post.dataValues;

    const destructuredItem = {
      ...counts,
      ...postFormatted,
    };

    response.push(destructuredItem);
  });

  return result(null, responseHandler(true, 200, 'Success', response));
};

exports.retrieveAllTop = async (result) => {
  const queryResult = await PostsModelSequelize.findAll({
    distinct: true,
    attributes: [
      'id',
      'user_id',
      'views',
      [Sequelize.literal('user.username'), 'username'],
      [Sequelize.literal('user.gravatar'), 'gravatar'],
      [Sequelize.literal('tags.id'), 'tag_id'],
      [Sequelize.literal('tags.tagname'), 'tagname'],
      'created_at',
      'updated_at',
      'title',
      'body',
      [Sequelize.literal('COUNT(DISTINCT(answers.id))'), 'answer_count'],
      [Sequelize.literal('COUNT(DISTINCT(comments.id))'), 'comment_count'],
    ],
    include: [
      {
        model: TagsModelSequelize,
        required: true,
        attributes: [],
      },
      {
        model: UsersModelSequelize,
        required: true,
        attributes: [],
      },
      {
        model: AnswersModelSequelize,
        required: false,
        attributes: [],
      },
      {
        model: CommentsModelSequelize,
        required: false,
        attributes: [],
      },
    ],
    group: ['id'],
    order: [
      [Sequelize.literal('answer_count DESC')],
      [Sequelize.literal('comment_count DESC')],
    ],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if (conditionalHelper.isArrayEmpty(queryResult)) {
    return result(responseHandler(false, 404, 'There are no posts', null), null);
  }

  return result(null, responseHandler(true, 200, 'Success', queryResult));
};

exports.retrieveAllTag = async (tagName, result) => {
  const queryResult = await PostsModelSequelize.findAll({
    where: {
      '$tags.tagname$': tagName,
    },
    distinct: true,
    attributes: [
      'id',
      'user_id',
      'views',
      [Sequelize.literal('user.username'), 'username'],
      [Sequelize.literal('user.gravatar'), 'gravatar'],
      [Sequelize.literal('tags.id'), 'tag_id'],
      [Sequelize.literal('tags.tagname'), 'tagname'],
      'created_at',
      'updated_at',
      'title',
      'body',
      [Sequelize.literal('COUNT(DISTINCT(answers.id))'), 'answer_count'],
      [Sequelize.literal('COUNT(DISTINCT(comments.id))'), 'comment_count'],
    ],
    include: [
      {
        model: TagsModelSequelize,
        required: true,
        attributes: [],
      },
      {
        model: UsersModelSequelize,
        required: true,
        attributes: [],
      },
      {
        model: AnswersModelSequelize,
        required: false,
        attributes: [],
      },
      {
        model: CommentsModelSequelize,
        required: false,
        attributes: [],
      },
    ],
    group: ['id'],
    order: [['created_at', 'DESC']],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if (conditionalHelper.isArrayEmpty(queryResult)) {
    return result(responseHandler(false, 404, 'There are no posts', null), null);
  }

  return result(null, responseHandler(true, 200, 'Success', queryResult));
};
