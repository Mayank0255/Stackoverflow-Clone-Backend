const { VotesRepository } = require('../repositories');

exports.add = (targetType, targetId, userId, score, result) => VotesRepository.addVote(targetType, targetId, userId, score, result);

exports.remove = (targetType, targetId, userId,result) => VotesRepository.remove(targetType, targetId, userId,result);

exports.retrieve = (targetType, targetId, userId,result) => VotesRepository.retrieveVote(targetType, targetId, userId,result);

exports.retrieveAll = (targetType, targetId, result) => VotesRepository.retrieveVoteScore(targetType, targetId, result);