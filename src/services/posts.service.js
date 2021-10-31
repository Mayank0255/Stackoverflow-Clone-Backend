/* eslint-disable max-len */
const investApi = require('./investApi');
const repository = require('../repositories/posts.repository');

const create = async (newPost, result) => {
  const tagDescription = await investApi.fetchTagDesc(newPost.tagname);
  repository.create(newPost, result, tagDescription);
};

const remove = (id, result) => repository.remove(id, result);

const retrieveOne = (postId, result) => repository.retrieveOne(postId, result);

const retrieveAll = ({ action, tagName }, result) => repository.retrieveAll(action, tagName, result);

module.exports = {
  create,
  remove,
  retrieveOne,
  retrieveAll,
};
