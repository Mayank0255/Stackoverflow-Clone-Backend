const helperFunction = require('../helpers/helperFunction');
const { AnswersModelSequelize } = require('../models/answers.model');

const create = async (newAnswer, result) => {
  const queryResult = await AnswersModelSequelize.create({
    body: newAnswer.body,
    user_id: newAnswer.user_id,
    post_id: newAnswer.post_id,
  });

  result(
    null,
    helperFunction.responseHandler(true, 200, 'Answer Added', queryResult.id),
  );
};

const remove = async (id, result) => {
  const queryResult = await AnswersModelSequelize.destroy({
    where: { id },
  });

  if (queryResult === 1) {
    result(null, helperFunction.responseHandler(true, 200, 'Answer Removed', null));
  } else {
    result(helperFunction.responseHandler(false, 404, 'This answer doesn\'t exists', null), null);
  }
};

const retrieveAll = (postId, result) => {
  const query = ` 
  SELECT 
    answers.id, 
    post_id, 
    answers.user_id, 
    username, 
    answers.body, 
    answers.created_at 
  FROM 
    answers 
    JOIN posts ON posts.id = post_id 
    JOIN users ON users.id = answers.user_id 
  WHERE 
    post_id = ?;`;

  pool.query(query, postId, (err, results) => {
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        helperFunction.responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There are no answers',
          null,
        ),
        null,
      );
      return;
    }
    result(null, helperFunction.responseHandler(true, 200, 'Success', results));
  });
};

module.exports = {
  create,
  remove,
  retrieveAll,
};
