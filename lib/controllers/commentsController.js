const Router = require('express');
const Comment = require('../models/comments/Comments');

module.exports = Router()
  .post('', (req, res, next) => {
    Comment.insert(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })
  .get('', (req, res, next) => {
    Comment.find()
      .then(comments => res.send(comments))
      .catch(next);
  })
;
