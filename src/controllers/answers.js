const { validationResult } = require('express-validator');
const helperFunction = require('../helpers/helperFunction');
const { Answer } = require('../models/answers.model');
const service = require('../services/answers.service');

const getAnswers = (req, res) => {
  try {
    console.log(req);
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

const addAnswer = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
  }
  try {
    const answer = new Answer({
      body: req.body.text,
      user_id: req.user.id,
      post_id: req.params.id,
    });
    // Save Answer in the database
    service.create(answer, (err, data) => {
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

const deleteAnswer = async (req, res) => {
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

module.exports = answersController = {
  getAnswers,
  addAnswer,
  deleteAnswer,
};
