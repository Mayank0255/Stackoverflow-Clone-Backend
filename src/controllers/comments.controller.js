const { validationResult } = require('express-validator');
const helperFunction = require('../helpers/helperFunction');
const { Comment } = require('../models/comments.model');
const service = require('../services/comments.service');

const getComments = (req, res) => {
  try {
    service.retrieveAll(req.params.id, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
  }
};

const addComment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
  }

  try {
    const comment = new Comment({
      body: req.body.body,
      user_id: req.user.id,
      post_id: req.params.id,
    });
    // Save Comment in the database
    service.create(comment, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
  }
};

const deleteComment = (req, res) => {
  try {
    service.remove(req.params.id, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
  }
};

module.exports = commentsController = {
  getComments,
  addComment,
  deleteComment,
};
