/* eslint-disable max-len */
const investApi = require('./investApi');
const repository = require('../repositories/posts.repository');

exports.create = async (newPost, result) => {
  const tagDescription = await investApi.fetchTagDesc(newPost.tagname);
  repository.create(newPost, result, tagDescription);
};

exports.remove = (id, result) => repository.remove(id, result);

exports.retrieveOne = (postId, result) => repository.retrieveOne(postId, result);

exports.retrieveAll = (result) => repository.retrieveAll(result);

exports.retrieveAllTop = (result) => repository.retrieveAllTop(result);

exports.retrieveAllTag = (tagName, result) => repository.retrieveAllTag(tagName, result);
