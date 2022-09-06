const { validationResult } = require('express-validator');
const { responseHandler, asyncHandler } = require('../helpers');
const { answersService } = require('../services');

const Answer = (answer) => ({
  body: answer.body,
  userId: answer.userId,
  postId: answer.postId,
});

exports.getAnswers = asyncHandler(async (req, res) => {
  try {
    await answersService.retrieveAll(req.params.id, (err, data) => {
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

exports.addAnswer = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseHandler(false, 400, errors.array()[0].msg, null));
  }
  try {
    const answer = Answer({
      body: req.body.text,
      userId: req.user.id,
      postId: req.params.id,
    });
    // Save Answer in the database
    await answersService.create(answer, (err, data) => {
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

exports.deleteAnswer = asyncHandler(async (req, res) => {
  try {
    await answersService.remove(req.params.id, (err, data) => {
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
