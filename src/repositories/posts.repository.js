const Sequelize = require('sequelize');
const db = require('../config/db.config');
const utils = require('../utils');
const {
  responseHandler,
  investApi,
} = require('../helpers');
const {
  PostsModel,
  TagsModel,
  AnswersModel,
  CommentsModel, UsersModel,
} = require('../models');
const PostTagRepository = require('./posttag.repository');

exports.create = async (newPost, result) => {
  let transaction;
  try {
    transaction = await db.transaction();

    const tags = newPost.tagName.split(',').map((item) => item.trim());

    if (tags.length > 5) {
      return result(responseHandler(false, 400, 'Only Tags Upto 5 Are Allowed', null), null);
    }

    const post = await PostsModel.create({
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
      const tag = await TagsModel.findOne({
        where: {
          tagname: item,
        },
      })
        .catch((error) => {
          console.log(error);
          result(responseHandler(false, 500, 'Something went wrong', null), null);
          return null;
        });

      if (!utils.conditional.isNull(tag)) {
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

    const newCreatedTags = await TagsModel.bulkCreate(mapNewTags)
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

    PostTagRepository.bulkCreate(mapAllTags);

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
  let t;

  try {
    t = await db.transaction();

    await AnswersModel.destroy({ where: { post_id: id } }, { transaction: t });

    await CommentsModel.destroy({ where: { post_id: id } }, { transaction: t });

    await PostTagRepository.remove(id, t);

    await PostsModel.destroy({ where: { id } }, { transaction: t });

    result(
      null,
      responseHandler(true, 200, 'Post Removed', null),
    );

    await t.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    await t.rollback();
  }
};

exports.retrieveOne = async (postId, result) => {
  await PostsModel.increment('views',
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
        required: true,
        attributes: ['id', 'tagname'],
      },
      {
        model: UsersModel,
        required: true,
        attributes: [],
      },
    ],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const answersCount = await PostsModel.count({
    where: {
      id: postId,
    },
    include: {
      model: AnswersModel,
      required: true,
      attributes: [],
    },
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const commentsCount = await PostsModel.count({
    where: {
      id: postId,
    },
    include: {
      model: CommentsModel,
      required: true,
      attributes: [],
    },
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if (utils.conditional.isNull(queryResult)) {
    return result(responseHandler(false, 404, 'There isn\'t any post by this id', null), null);
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

  const response = {
    answer_count: answersCount,
    comment_count: commentsCount,
    ...queryResult,
  };

  return result(null, responseHandler(true, 200, 'Success', response));
};

exports.retrieveAll = async (result) => {
  const posts = await PostsModel.findAll({
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
        required: true,
        attributes: ['id', 'tagname'],
      },
      {
        model: UsersModel,
        required: true,
        attributes: [],
      },
    ],
    order: [['created_at', 'DESC']],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const postCounts = await PostsModel.findAll({
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
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
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
    return result(responseHandler(false, 404, 'There are no posts', null), null);
  }

  const postCountsMap = postCounts.map((post) => utils.array.sequelizeResponse(post, 'id', 'answer_count', 'comment_count'));

  const response = utils.array.mergeById(postsMap, postCountsMap);

  return result(null, responseHandler(true, 200, 'Success', response));
};

exports.retrieveAllTag = async (tagName, result) => {
  const posts = await PostsModel.findAll({
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
        model: TagsModel,
        required: true,
        attributes: ['id', 'tagname'],
      },
      {
        model: UsersModel,
        required: true,
        attributes: [],
      },
    ],
    order: [['created_at', 'DESC']],
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const postCounts = await PostsModel.findAll({
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
        model: TagsModel,
        required: true,
        attributes: [],
      },
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
  }).catch((error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if (utils.conditional.isArrayEmpty(posts)) {
    return result(responseHandler(false, 404, 'There are no posts', null), null);
  }

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

  const postCountsMap = postCounts.map((post) => utils.array.sequelizeResponse(post, 'id', 'answer_count', 'comment_count'));

  const response = utils.array.mergeById(postsMap, postCountsMap);

  return result(null, responseHandler(true, 200, 'Success', response));
};
