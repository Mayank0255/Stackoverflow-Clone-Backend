const Sequelize = require('sequelize');
const responseHandler = require('../helpers/responseHandler');
const { TagsModelSequelize } = require('../models/tags.model');
const { PostsModelSequelize } = require('../models/posts.model');

exports.retrieveAll = async (result) => {
  try {
    const queryResult = await TagsModelSequelize.findAll({
      require: false,
      distinct: true,
      col: 'posts.id',
      include: PostsModelSequelize,
      attributes: ['id',
        'tagname',
        'description',
        [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
        'created_at'],
      group: ['tags.id'],
      order: [[Sequelize.col('posts_count'), 'DESC']],
      raw: true,
    });

    const queryResultMap = queryResult.map((tag) => {
      const {
        // eslint-disable-next-line camelcase
        id, tagname, description, posts_count, created_at,
      } = tag;

      return {
        id, tagname, description, posts_count, created_at,
      };
    });

    if (queryResultMap.length === 0) {
      result(
        responseHandler(
          false,
          404,
          'There are no tags',
          null,
        ),
        null,
      );
      return;
    }
    result(null, responseHandler(true, 200, 'Success', queryResultMap));
  } catch (error) {
    console.log('error: ', error);
    result(
      responseHandler(
        false,
        error ? error.statusCode : 500,
        error ? error.message : 'Internal error',
        null,
      ),
      null,
    );
  }
};

exports.retrieveOne = async (tagName, result) => {
  try {
    const queryResult = await TagsModelSequelize.findOne({
      require: false,
      include: PostsModelSequelize,
      attributes: [
        'id',
        'tagname',
        'description',
        [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
        'created_at'],
      where: { tagname: tagName },
      group: ['tags.id'],
    });

    if (!queryResult) {
      result(
        responseHandler(
          false,
          404,
          'This tag doesn\'t exists',
          null,
        ),
        null,
      );
      return;
    }

    const {
      // eslint-disable-next-line camelcase
      id, tagname, description, posts_count, created_at,
    } = queryResult.dataValues;

    const tagResult = {
      id, tagname, description, posts_count, created_at,
    };

    result(null, responseHandler(true, 200, 'Success', tagResult));
  } catch (error) {
    console.log('error: ', error);
    result(
      responseHandler(
        false,
        error ? error.statusCode : 500,
        error ? error.message : 'Internal error',
        null,
      ),
      null,
    );
  }
};
