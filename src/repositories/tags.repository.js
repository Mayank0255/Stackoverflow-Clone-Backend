const Sequelize = require('sequelize');
const { responseHandler } = require('../helpers/responseHelpers');
const { isArrayEmpty } = require('../helpers/conditionalHelper');
const { TagsModelSequelize, PostsModelSequelize } = require('../models');

exports.retrieveAll = async (result) => {
  const queryResult = await TagsModelSequelize.findAll({
    distinct: true,
    include: {
      model: PostsModelSequelize,
      attributes: [],
    },
    attributes: ['id',
      'tagname',
      'description',
      [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
      'created_at'],
    group: ['tags.id'],
    order: [[Sequelize.col('posts_count'), 'DESC']],
  })
    .catch((error) => {
      console.log(error);
      return result(responseHandler(false, 500, 'Something went wrong', null), null);
    });

  if (isArrayEmpty(queryResult)) {
    return result(responseHandler(false, 404, 'There are no tags', null), null);
  }

  result(null, responseHandler(true, 200, 'Success', queryResult));
};

exports.retrieveOne = async (tagName, result) => {
  const queryResult = await TagsModelSequelize.findOne({
    require: false,
    include: {
      model: PostsModelSequelize,
      attributes: [],
    },
    attributes: ['id',
      'tagname',
      'description',
      [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
      'created_at'],
    where: { tagname: tagName },
    group: ['tags.id'],
  })
    .catch((error) => {
      console.log(error);
      return result(responseHandler(false, 500, 'Something went wrong', null), null);
    });

  if (!queryResult) {
    return result(responseHandler(false, 404, 'This tag doesn\'t exists', null), null);
  }

  result(null, responseHandler(true, 200, 'Success', queryResult));
};
