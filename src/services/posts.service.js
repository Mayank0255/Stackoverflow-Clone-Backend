/* eslint-disable max-len */
const { investApi } = require('../helpers');
const { postsRepository } = require('../repositories');

exports.create = async (newPost, result) => {
  const tagDescription = await investApi.fetchTagDesc(newPost.tagName);
  await postsRepository.create(newPost, result, tagDescription);
};

exports.remove = (id, result) => postsRepository.remove(id, result);

exports.retrieveOne = (postId, result) => postsRepository.retrieveOne(postId, result);

exports.retrieveAll = (result) => postsRepository.retrieveAll(result);

exports.retrieveAllTop = (result) => postsRepository.retrieveAllTop(result);

exports.retrieveAllTag = (tagName, result) => postsRepository.retrieveAllTag(tagName, result);
