const postsService = require('./posts.service');
const answersService = require('./answers.service');
const commentsService = require('./comments.service');
const usersService = require('./users.service');
const tagsService = require('./tags.service');
const votesService = require('./votes.service')

module.exports = {
  postsService,
  answersService,
  commentsService,
  usersService,
  tagsService,
  votesService
};

