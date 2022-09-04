const Sequelize = require('sequelize');
const utils = require('../utils');
const { responseHandler } = require('../helpers');
const { TagsModel, PostsModel } = require('../models');

exports.retrieveAll = async (result) => {
  const queryResult = await TagsModel.findAll({
    distinct: true,
    attributes: [
      'id',
      'tagname',
      'description',
      [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
      'created_at',
    ],
    include: {
      model: PostsModel,
      attributes: [],
    },
    group: ['tags.id'],
    order: [[Sequelize.col('posts_count'), 'DESC']],
  })
    .catch((error) => {
      console.log(error);
      return result(responseHandler(false, 500, 'Something went wrong', null), null);
    });

  const tagsMap = queryResult.map((tag) => utils.array.sequelizeResponse(
    tag,
    'id',
    'tagname',
    'description',
    'posts_count',
    'created_at',
  ));

  if (utils.conditional.isArrayEmpty(tagsMap)) {
    return result(responseHandler(false, 404, 'There are no tags', null), null);
  }

  result(null, responseHandler(true, 200, 'Success', tagsMap));
};

exports.retrieveOneWithCount = async (tagName, result) => {
  let queryResult = await TagsModel.findOne({
    require: false,
    attributes: [
      'id',
      'tagname',
      'description',
      [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
      'created_at',
    ],
    include: {
      model: PostsModel,
      attributes: [],
    },
    where: { tagname: tagName },
    group: ['tags.id'],
  })
    .catch((error) => {
      console.log(error);
      return result(responseHandler(false, 500, 'Something went wrong', null), null);
    });

  if (utils.conditional.isNull(queryResult)) {
    return result(responseHandler(false, 404, 'This tag doesn\'t exists', null), null);
  }

  queryResult = utils.array.sequelizeResponse(
    queryResult,
    'id',
    'tagname',
    'description',
    'posts_count',
    'created_at',
  );

  result(null, responseHandler(true, 200, 'Success', queryResult));
};

exports.bulkCreate = async (tags) => await TagsModel.bulkCreate(tags)
  .catch((error) => {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    return null;
  });

exports.retrieveOne = async (tagname) => {
  console.log('hello', tagname);
  return await TagsModel.findOne({
    where: {
      tagname,
    },
  })
    .catch((error) => {
      console.log(error);
      result(responseHandler(false, 500, 'Something went wrong', null), null);
      return null;
    });
};
