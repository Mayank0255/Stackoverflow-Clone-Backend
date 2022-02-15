const bcrypt = require('bcryptjs');
const util = require('util');
const responseHandler = require('../helpers/responseHandler');

const register = async (newUser, result) => {
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  const query = `INSERT INTO users(username,password) VALUES(?,?);`;

  const queryResult = util.promisify(pool.query).bind(pool);
  const rows = await queryResult(query, [newUser.username, newUser.password]);

  if (rows === null || rows.length === 0) {
    if (err) {
      console.log('error: ', err);
      result(
        responseHandler(
          false,
          err.statusCode,
          err.message,
          null,
        ),
        null,
      );
      return null;
    }
  }

  const payload = {
    user: {
      id: rows.insertId,
    },
  };

  return payload;
};

const login = async (newUser, result) => {
  const query = `SELECT * FROM users WHERE username = ?;`;
  const queryResult = util.promisify(pool.query).bind(pool);
  const rows = await queryResult(query, [newUser.username, newUser.password]);

  if (rows === null || rows.length === 0) {
    if (err || !results[0]) {
      console.log('error: ', err);
      const code = !results[0] ? 404 : err.statusCode;
      result(
        responseHandler(
          false,
          code,
          !results[0] ? 'User does not exists' : err.message,
          null,
        ),
        null,
      );
      return null;
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(newUser.password, user.password);

    if (!isMatch) {
      result(
        responseHandler(false, 400, 'Incorrect password', null),
        null,
      );

      return null;
    }
  }

  const payload = {
    user: {
      id: rows[0].id,
    },
  };

  return payload;
};

const retrieveAll = (result) => {
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

const retrieveOne = (id, result) => {
  const updateQuery = `UPDATE users SET views = views + 1 WHERE users.id = ?;`;

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

  pool.query(updateQuery, id, (err) => {
    if (err) {
      console.log('error: ', err);
      result(
        responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There isn\'t any user by this id',
          null,
        ),
        null,
      );
    }
  });

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

const loadUser = (userId, result) => {
  const query = `SELECT id,username,created_at FROM users WHERE id = ?;`;

  pool.query(query, userId, (err, results) => {
    if (err) {
      console.log('error: ', err);
      result(
        responseHandler(
          false,
          err.statusCode,
          err.message,
          null,
        ),
        null,
      );
      return;
    }
    result(
      null,
      responseHandler(true, 200, 'Success', results[0]),
    );
  });
};

module.exports = {
  register,
  login,
  retrieveAll,
  retrieveOne,
  loadUser,
};
