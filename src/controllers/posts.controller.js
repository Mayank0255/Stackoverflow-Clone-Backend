const { validationResult } = require('express-validator');
const helperFunction = require('../helpers/helperFunction');
const { Post } = require('../models/posts.model');
const service = require('../services/posts.service');

const getPosts = (req, res) => {
  try {
    service.retrieveAll((err, data) => {
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
      .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
  }
};

const getTopPosts = (req, res) => {
  try {
    service.retrieveAllTop(
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
  }
};

const getTagPosts = (req, res) => {
  const tagName = req.params.tagname;

  try {
    service.retrieveAllTag(
      tagName,
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
  }
};

const getSinglePost = (req, res) => {
  try {
    service.retrieveOne(req.params.id, (err, data) => {
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

const addPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
  }
  try {
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      userId: req.user.id,
      tagname: req.body.tagname,
    });
    // Save Post in the database
    service.create(post, (err, data) => {
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

const deletePost = (req, res) => {
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

module.exports = postsController = {
  getPosts,
  getTopPosts,
  getTagPosts,
  getSinglePost,
  addPost,
  deletePost,
};
