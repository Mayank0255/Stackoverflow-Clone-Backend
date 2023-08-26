const { AnswersRepository } = require('../repositories');

exports.create = (newAnswer, result) => AnswersRepository.create(newAnswer, result);

exports.remove = async (id, result) => {
    try {
        t = await db.transaction();
        await VotesRepository.removeAllVotes("answers",id,t) 
        await AnswersRepository.remove(id, result);
        result(
            null,
            responseHandler(true, 200, 'Post Removed', null),
        );

        await t.commit();
    } catch (error) {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        await t.rollback();
    }
    
}

exports.retrieveAll = (postId, result) => AnswersRepository.retrieveAll(postId, result);
