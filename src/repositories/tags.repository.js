const Sequelize = require('sequelize');
const helperFunction = require('../helpers/helperFunction');
const { Tags } = require('../models/tags.model');
const { Posts } = require('../models/posts.model');

const retrieveAll = async (result) => {
  try {
    const queryResult = await Tags.findAll({
      require: false,
      distinct: true,
      col: 'posts.id',
      include: Posts,
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
        helperFunction.responseHandler(
          false,
          404,
          'There are no tags',
          null,
        ),
        null,
      );
      return;
    }
    result(null, helperFunction.responseHandler(true, 200, 'Success', queryResultMap));
  } catch (error) {
    console.log('error: ', error);
    result(
      helperFunction.responseHandler(
        false,
        error ? error.statusCode : 500,
        error ? error.message : 'Internal error',
        null,
      ),
      null,
    );
  }
};

const retrieveOne = async (tagName, result) => {
  try {
    const queryResult = await Tags.findOne({
      require: false,
      include: Posts,
      attributes: ['id',
        'tagname',
        'description',
        [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
        'created_at'],
      where: { tagname: tagName },
      group: ['tags.id'],
    });

    if (!queryResult) {
      result(
        helperFunction.responseHandler(
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

    result(null, helperFunction.responseHandler(true, 200, 'Success', tagResult));
  } catch (error) {
    console.log('error: ', error);
    result(
      helperFunction.responseHandler(
        false,
        error ? error.statusCode : 500,
        error ? error.message : 'Internal error',
        null,
      ),
      null,
    );
  }
};

module.exports = {
  retrieveAll,
  retrieveOne,
};
