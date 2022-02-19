const responseHandler = require('../helpers/responseHandler');
const { AnswersModelSequelize } = require('../models/sequelize');

exports.create = async (newAnswer, result) => {
  await AnswersModelSequelize.create({
    body: newAnswer.body,
    user_id: newAnswer.user_id,
    post_id: newAnswer.post_id,
  })
    .then((response) => {
      result(
        null,
        responseHandler(true, 200, 'Answer Added', response.id),
      );
    })
    .catch((error) => {
      console.log(error);
      result(responseHandler(false, 500, 'Some error occurred while adding the answer.', null), null);
    });
};

exports.remove = async (id, result) => {
  await AnswersModelSequelize.destroy({
    where: { id },
  })
    .then(() => {
      result(null, responseHandler(true, 200, 'Answer Removed', null));
    })
    .catch((error) => {
      console.log(error.message);
      result(responseHandler(false, 404, 'This answer doesn\'t exists', null), null);
    });
};

exports.retrieveAll = (postId, result) => {
  const query = ` 
  SELECT
    answers.id,
    post_id,
    answers.user_id,
    users.gravatar,
    username,
    answers.body,
    answers.created_at
  FROM 
    answers 
    INNER JOIN users ON users.id = answers.user_id 
  WHERE 
    post_id = ?;`;

  pool.query(query, postId, (err, results) => {
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There are no answers',
          null,
        ),
        null,
      );
      return;
    }
    result(null, responseHandler(true, 200, 'Success', results));
  });
};
