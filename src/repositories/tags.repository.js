const Sequelize = require('sequelize');
const { conditionalHelper, responseHandler, format } = require('../helpers');
const { TagsModelSequelize, PostsModelSequelize } = require('../models');

exports.retrieveAll = async (result) => {
  const queryResult = await TagsModelSequelize.findAll({
    distinct: true,
    attributes: [
      'id',
      'tagname',
      'description',
      [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
      'created_at',
    ],
    include: {
      model: PostsModelSequelize,
      attributes: [],
    },
    group: ['tags.id'],
    order: [[Sequelize.col('posts_count'), 'DESC']],
  })
    .catch((error) => {
      console.log(error);
      return result(responseHandler(false, 500, 'Something went wrong', null), null);
    });

  const tagsMap = queryResult.map((tag) => format.sequelizeResponse(
    tag,
    'id',
    'tagname',
    'description',
    'posts_count',
    'created_at',
  ));

  if (conditionalHelper.isArrayEmpty(tagsMap)) {
    return result(responseHandler(false, 404, 'There are no tags', null), null);
  }

  result(null, responseHandler(true, 200, 'Success', tagsMap));
};

exports.retrieveOne = async (tagName, result) => {
  let queryResult = await TagsModelSequelize.findOne({
    require: false,
    attributes: [
      'id',
      'tagname',
      'description',
      [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
      'created_at',
    ],
    include: {
      model: PostsModelSequelize,
      attributes: [],
    },
    where: { tagname: tagName },
    group: ['tags.id'],
  })
    .catch((error) => {
      console.log(error);
      return result(responseHandler(false, 500, 'Something went wrong', null), null);
    });

  if (conditionalHelper.isNull(queryResult)) {
    return result(responseHandler(false, 404, 'This tag doesn\'t exists', null), null);
  }

  queryResult = format.sequelizeResponse(
    queryResult,
    'id',
    'tagname',
    'description',
    'posts_count',
    'created_at',
  );

  result(null, responseHandler(true, 200, 'Success', queryResult));
};
