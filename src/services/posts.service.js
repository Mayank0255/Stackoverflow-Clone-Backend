/* eslint-disable max-len */
const { investApi } = require('../helpers');
const { postsRepository } = require('../repositories');

exports.create = (newPost, result) => {
  // const tagDescription = await investApi.fetchTagDesc(newPost.tagName);
  postsRepository.create(newPost, result);
};

exports.remove = (id, result) => postsRepository.remove(id, result);

exports.retrieveOne = (postId, result) => postsRepository.retrieveOne(postId, result);

exports.retrieveAll = (result) => postsRepository.retrieveAll(result);

exports.retrieveAllTag = (tagName, result) => postsRepository.retrieveAllTag(tagName, result);
