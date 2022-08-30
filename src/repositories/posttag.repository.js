const { PostTagModel } = require('../models');

exports.remove = async (postId, t) => {
  await PostTagModel
    .destroy({ where: { post_id: postId } }, { transaction: t })
    .then(() => ({ status: true, message: 'PostTag Removed' }))
    .catch((error) => {
      throw new Error(`PostTag Delete Operation Failed: ${error}`);
    });
};

exports.bulkCreate = async (tags) => {
  await PostTagModel.bulkCreate(tags)
    .catch((error) => {
      console.log(error);
      result(responseHandler(false, 500, 'Something went wrong', null), null);
      return null;
    });
};
