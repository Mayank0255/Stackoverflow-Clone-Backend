const bcrypt = require('bcryptjs');
const getJwtToken = require('../services/jwt');
const responseHandler = require('../helpers/responseHandler');
const { UsersModelSequelize } = require('../models/sequelize');

exports.register = async (newUser, result) => {
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await UsersModelSequelize.create({
    username: newUser.username,
    password: newUser.password,
  })
    .then((response) => {
      const payload = {
        user: {
          id: response.id,
        },
      };

      getJwtToken(payload, 'User registered', result);

      return payload;
    })
    .catch((error) => {
      console.log(error.message);
      result(responseHandler(false, 500, 'Some error occurred while registering the user.', null), null);
      return null;
    });
};

exports.login = async (newUser, result) => {
  const user = await UsersModelSequelize.findOne({
    where: {
      username: newUser.username,
    },
  }).catch((error) => {
    console.log(error.message);
    result(
      responseHandler(false, code, 'Some error occurred while logging in the user.', null),
      null,
    );
    return null;
  });

  console.log('[QUERYRESULT]', user);

  if (user === null) {
    result(
      responseHandler(
        false,
        404,
        'User does not exists',
        null,
      ),
      null,
    );
    return null;
  }

  const isMatch = await bcrypt.compare(newUser.password, user.password);

  if (!isMatch) {
    result(
      responseHandler(false, 400, 'Incorrect password', null),
      null,
    );

    return null;
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  getJwtToken(payload, 'User logged in', result);

  return payload;
};

exports.retrieveAll = (result) => {
  const selectQuery = `
  SELECT 
    users.id, 
    username, 
    users.created_at, 
    users.views, 
    COUNT(DISTINCT posts.id) as posts_count, 
    COUNT(DISTINCT tagname) as tags_count 
  FROM 
    users 
    LEFT JOIN posts ON posts.user_id = users.id 
    LEFT JOIN posttag ON posttag.post_id = posts.id 
    LEFT JOIN tags ON posttag.tag_id = tags.id 
  GROUP BY 
    users.id 
  ORDER BY 
    posts_count DESC;`;

  pool.query(
    selectQuery,
    (err, results) => {
      if (err || results.length === 0) {
        console.log('error: ', err);
        result(
          responseHandler(
            false,
            err ? err.statusCode : 404,
            err ? err.message : 'There are no users',
            null,
          ),
          null,
        );
        return;
      }
      result(
        null,
        responseHandler(
          true,
          200,
          'Success',
          results,
        ),
      );
    },
  );
};

exports.retrieveOne = async (id, result) => {
  await UsersModelSequelize.increment('views',
    {
      by: 1,
      where: { id },
    })
    .catch((error) => {
      console.log('error: ', error);
      result(
        responseHandler(
          false,
          error ? error.statusCode : 404,
          error ? error.message : 'There isn\'t any user by this id',
          null,
        ),
        null,
      );
      // eslint-disable-next-line no-useless-return
      return;
    });

  const selectQuery = `
  SELECT 
    users.id, 
    username, 
    users.created_at, 
    users.views, 
    COUNT(DISTINCT posts.id) as post_count, 
    COUNT(DISTINCT tagname) as tag_count, 
    COUNT(DISTINCT answers.id) as answer_count, 
    COUNT(DISTINCT comments.id) as comment_count 
  FROM 
    users 
    LEFT JOIN posts ON posts.user_id = users.id 
    LEFT JOIN posttag ON posttag.post_id = posts.id 
    LEFT JOIN tags ON posttag.tag_id = tags.id 
    LEFT JOIN answers ON answers.user_id = users.id 
    LEFT JOIN comments ON comments.user_id = users.id 
  WHERE 
    users.id = ? 
  GROUP BY 
    users.id;`;

  pool.query(
    selectQuery,
    id,
    (err, results) => {
      if (err || results.length === 0) {
        console.log('error: ', err);
        result(
          responseHandler(
            false,
            err ? err.statusCode : 404,
            err ? err.message : 'There are no users',
            null,
          ),
          null,
        );
        return;
      }
      result(
        null,
        responseHandler(
          true,
          200,
          'Success',
          results[0],
        ),
      );
    },
  );
};

// eslint-disable-next-line camelcase
exports.loadUser = async (user_id, result) => {
  await UsersModelSequelize.findOne({
    where: { id: user_id },
    attributes: ['id', 'username', 'created_at'],
  })
    .then((response) => {
      result(null, responseHandler(true, 200, 'Success', response));
    }).catch((error) => {
      console.log('error: ', error);
      result(responseHandler(false, error.statusCode, 'User not found', null), null);
    });
};
