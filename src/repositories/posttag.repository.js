const Sequelize = require('sequelize');
const utils = require('../utils');
const { PostTagModel } = require('../models');

exports.remove = async (postId, t) => {
  await PostTagModel
    .destroy({ where: { post_id: postId } }, { transaction: t })
    .then(() => ({ status: true, message: 'PostTag Removed' }))
    .catch((error) => {
      throw new Error(`PostTag Delete Operation Failed: ${error}`);
    });
};
