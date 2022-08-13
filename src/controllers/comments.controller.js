const { validationResult } = require('express-validator');
const { responseHandler, asyncHandler } = require('../helpers');
const { commentsService } = require('../services');

const Comment = (comment) => ({
  body: comment.body,
  userId: comment.userId,
  postId: comment.postId,
});

exports.getComments = asyncHandler(async (req, res) => {
  try {
    await commentsService.retrieveAll(req.params.id, (err, data) => {
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
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.addComment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseHandler(false, 400, errors.array()[0].msg, null));
  }

  try {
    const comment = Comment({
      body: req.body.body,
      userId: req.user.id,
      postId: req.params.id,
    });
    // Save Comment in the database
    await commentsService.create(comment, (err, data) => {
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
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.deleteComment = asyncHandler(async (req, res) => {
  try {
    await commentsService.remove(req.params.id, (err, data) => {
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
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});
