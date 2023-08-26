const { VotesModel } = require('../models');
const { responseHandler } = require('../helpers');

exports.addVote = async (targetType, targetId, userId, newScore, result) => {
  try {
    const existingVote = await VotesModel.findOne({
      where: { target_type: targetType, target_id: targetId, user_id: userId },
    });

    if (existingVote) {
      await VotesModel.update(
        { vote_score: newScore },
        {
          where: { target_type: targetType, target_id: targetId, user_id: userId },
        }
      );
    } else { 
      await VotesModel.create({
        target_type: targetType,
        target_id: targetId,
        user_id: userId,
        vote_score: newScore
      });
    }

    result(responseHandler(true, 200, 'Vote added/updated successfully', null), null);
  } catch (error) {
    console.error(error);
    result(responseHandler(false, 500, 'Failed to add/update vote', null), null);
  }
};

exports.remove = async (targetType, targetId, userId, result) => {
  try {
    const deletedCount = await VotesModel.destroy({
      where: { target_type: targetType, target_id: targetId, user_id: userId },
    });

    if (deletedCount === 0) {
      // If no vote was deleted, you can consider returning a response
      // indicating that there was no vote to delete.
      result(responseHandler(true, 200, 'No vote found to delete', null), null);
      return;
    }

    result(responseHandler(true, 200, 'Vote deleted successfully', null), null);
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Failed to delete vote', null), null);
  }
};


exports.retrieveVote = async (targetType, targetId, userId, result) => {
  try {
    const vote = await VotesModel.findOne({
      where: { target_type: targetType, target_id: targetId, user_id: userId },
    });

    if (vote === null) {
      // If there's no matching vote, you can consider returning a response
      // indicating that the user hasn't voted on this target.
      result(responseHandler(true, 200, 'User has not voted on this target', null), null);
      return;
    }

    result(responseHandler(true, 200, 'Vote retrieved successfully', {votes : vote.vote_score}), vote);
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Failed to get vote', null), null);
  }
};


exports.retrieveVoteScore = async (targetType, targetId, result) => {
  try {
    console.log(targetId, targetType);
    const voteScore = await VotesModel.sum('vote_score', {
      where: { target_type: targetType, target_id: targetId },
    });

    // If voteScore is null (no matching votes), return 0
    const totalVoteScore = voteScore !== null ? voteScore : 0;

    result(responseHandler(true, 200, 'Total vote score retrieved successfully', {votes : totalVoteScore}), totalVoteScore);
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Failed to get total vote score', null), null);
  }
};

exports.removeAllVotes = async (targetType, targetId, t) => {
  await VotesModel
    .destroy({ where: { target_type: targetType,target_id:targetId, } }, { transaction: t })
    .then(() => ({ status: true, message: 'Votes Removed' }))
    .catch((error) => {
      throw new Error(`Votes Delete Operation Failed: ${error}`);
    });
};


