const db = require('../../config/db.sequelize');
const responseHandler = require('../helpers/responseHandler');
const {
  PostsModelSequelize,
  PostTagModelSequelize,
  TagsModelSequelize,
  AnswersModelSequelize,
  CommentsModelSequelize,
} = require('../models/sequelize');

exports.create = async (newPost, result, tagDescription) => {
  let transaction;
  try {
    transaction = await db.transaction();

    const post = await PostsModelSequelize.create({
      title: newPost.title,
      body: newPost.body,
      user_id: newPost.user_id,
    })
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });

    const [tag] = await TagsModelSequelize.findOrCreate({
      where: {
        tagname: newPost.tagname,
      },
      defaults: {
        tagname: newPost.tagname,
        description: tagDescription,
      },
    })
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });

    await PostTagModelSequelize.create({
      post_id: post.id,
      tag_id: tag.id,
    })
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });

    result(
      null,
      responseHandler(true, 200, 'Post Created', post.id),
    );

    await transaction.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if (transaction) {
      await transaction.rollback();
    }
  }
};

exports.remove = async (id, result) => {
  let transaction;

  try {
    transaction = await db.transaction();

    await PostTagModelSequelize.destroy({ where: { post_id: id } });

    await AnswersModelSequelize.destroy({ where: { post_id: id } });

    await CommentsModelSequelize.destroy({ where: { post_id: id } });

    await PostsModelSequelize.destroy({ where: { id } });

    result(
      null,
      responseHandler(true, 200, 'Post Removed', null),
    );

    await transaction.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if (transaction) {
      await transaction.rollback();
    }
  }
};

exports.retrieveOne = async (postId, result) => {
  await PostsModelSequelize.increment('views',
    {
      by: 1,
      where: { id: postId },
    })
    .catch((error) => {
      console.log('error: ', error);
      result(
        responseHandler(
          false,
          error ? error.statusCode : 404,
          error ? error.message : 'There isn\'t any post by this id',
          null,
        ),
        null,
      );
      // eslint-disable-next-line no-useless-return
      return;
    });

  const query = `
  SELECT 
    posts.id, 
    posts.user_id, 
    tag_id, 
    COUNT(DISTINCT answers.id) as answer_count, 
    COUNT(DISTINCT comments.id) as comment_count, 
    username, 
    title, 
    posts.body as post_body, 
    tagname, 
    posts.created_at, 
    posts.views as views 
  FROM 
    posts 
    JOIN posttag ON posts.id = post_id 
    JOIN tags ON tag_id = tags.id 
    JOIN users ON user_id = users.id 
    LEFT JOIN answers ON answers.post_id = posts.id 
    LEFT JOIN comments ON posts.id = comments.post_id 
  WHERE 
    posts.id = ?;`;

  pool.query(query, postId, (err, results) => {
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There isn\'t any post by this id',
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

exports.retrieveAll = (result) => {
  const query = `
  SELECT 
    posts.id, 
    posts.user_id, 
    username, 
    COUNT(DISTINCT answers.id) as answer_count, 
    COUNT(DISTINCT comments.id) as comment_count, 
    tag_id, 
    title, 
    posts.body, 
    tagname, 
    description, 
    posts.created_at, 
    posts.views 
  FROM 
    posts 
    JOIN posttag ON posts.id = post_id 
    JOIN tags ON tag_id = tags.id 
    JOIN users ON user_id = users.id 
    LEFT JOIN answers ON answers.post_id = posts.id 
    LEFT JOIN comments ON posts.id = comments.post_id 
  GROUP BY 
    posts.id 
  ORDER BY 
    posts.created_at DESC;`;

  pool.query(query, (err, results) => {
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There are no posts',
          null,
        ),
        null,
      );
      return;
    }
    result(null, responseHandler(true, 200, 'Success', results));
  });
};

exports.retrieveAllTop = (result) => {
  const query = `
  SELECT 
    posts.id, 
    posts.user_id, 
    username, 
    COUNT(DISTINCT answers.id) as answer_count, 
    COUNT(DISTINCT comments.id) as comment_count, 
    tag_id, 
    title, 
    posts.body, 
    tagname, 
    description, 
    posts.created_at, 
    posts.views 
  FROM 
    posts 
    JOIN posttag ON posts.id = post_id 
    JOIN tags ON tag_id = tags.id 
    JOIN users ON user_id = users.id 
    LEFT JOIN answers ON answers.post_id = posts.id 
    LEFT JOIN comments ON posts.id = comments.post_id 
  GROUP BY 
    posts.id 
  ORDER BY 
    answer_count DESC, 
    comment_count DESC;`;

  pool.query(query, (err, results) => {
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There are no posts',
          null,
        ),
        null,
      );
      return;
    }
    result(null, responseHandler(true, 200, 'Success', results));
  });
};

exports.retrieveAllTag = (tagName, result) => {
  const query = `
  SELECT 
    posts.id, 
    posts.user_id, 
    username, 
    COUNT(DISTINCT answers.id) as answer_count, 
    COUNT(DISTINCT comments.id) as comment_count, 
    tag_id, 
    title, 
    posts.body, 
    tagname, 
    description, 
    posts.created_at, 
    posts.views 
  FROM 
    posts 
    JOIN posttag ON posts.id = post_id 
    JOIN tags ON tag_id = tags.id 
    JOIN users ON user_id = users.id 
    LEFT JOIN answers ON answers.post_id = posts.id 
    LEFT JOIN comments ON posts.id = comments.post_id 
  WHERE 
    tags.tagname = ? 
  GROUP BY 
    posts.id 
  ORDER BY 
    posts.created_at DESC;`;

  pool.query(query, tagName, (err, results) => {
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There are no posts',
          null,
        ),
        null,
      );
      return;
    }
    result(null, responseHandler(true, 200, 'Success', results));
  });
};
