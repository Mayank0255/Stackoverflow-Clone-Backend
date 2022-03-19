const Sequelize = require('sequelize');
const db = require('../config/db.config');
const {
  responseHandler,
  conditionalHelper,
  investApi,
  format,
} = require('../helpers');
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

    const tags = newPost.tagName.split(',').map((item) => item.trim());

    if (tags.length > 5) {
      return result(responseHandler(false, 400, 'Only Tags Upto 5 Are Allowed', null), null);
    }

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

    const mapAllTags = [];
    const mapAllTagsWithoutDesc = [];
    let mapNewTags = [];

    for (const item of tags) {
      const tag = await TagsModelSequelize.findOne({
        where: {
          tagname: item,
        },
      })
        .catch((error) => {
          console.log(error);
          result(responseHandler(false, 500, 'Something went wrong', null), null);
          return null;
        });

      if (!conditionalHelper.isNull(tag)) {
        mapAllTags.push({
          post_id: post.id,
          tag_id: tag.id,
        });
      } else {
        mapAllTagsWithoutDesc.push(item);
      }
    }

    /**
     * prepare a string of tags with ";" as delimeter
     * for eg:- [java, javascript] will become "java;javascript"
     */
    const mapAllTagsWithoutDescString = mapAllTagsWithoutDesc.join(';');

    const resp = await investApi.fetchTagDesc(mapAllTagsWithoutDescString);
    mapNewTags = investApi.prepareTags(mapAllTagsWithoutDesc, resp);

    const newCreatedTags = await TagsModelSequelize.bulkCreate(mapNewTags)
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });

    for (const tag of newCreatedTags) {
      mapAllTags.push({
        post_id: post.id,
        tag_id: tag.id,
      });
    }

    await PostTagModelSequelize.bulkCreate(mapAllTags)
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });

    result(null, responseHandler(true, 200, 'Post Created', post.id));

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

  let queryResult = await PostsModelSequelize.findOne({
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

  queryResult = format.sequelizeResponse(
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

  const response = {
    answer_count: answersCount,
    comment_count: commentsCount,
    ...queryResult,
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
      'id',
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

  const postsMap = posts.map((post) => format.sequelizeResponse(
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

  if (conditionalHelper.isArrayEmpty(postsMap)) {
    return result(responseHandler(false, 404, 'There are no posts', null), null);
  }

  const postCountsMap = postCounts.map((post) => format.sequelizeResponse(post, 'id', 'answer_count', 'comment_count'));

  const response = format.mergeById(postsMap, postCountsMap);

  return result(null, responseHandler(true, 200, 'Success', response));
};

exports.retrieveAllTag = async (tagName, result) => {
  const posts = await PostsModelSequelize.findAll({
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
    where: {
      '$tags.tagname$': tagName,
    },
    attributes: [
      'id',
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

  const postsMap = posts.map((post) => format.sequelizeResponse(
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

  const postCountsMap = postCounts.map((post) => format.sequelizeResponse(post, 'id', 'answer_count', 'comment_count'));

  const response = format.mergeById(postsMap, postCountsMap);

  return result(null, responseHandler(true, 200, 'Success', response));
};
