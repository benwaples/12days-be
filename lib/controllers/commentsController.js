const Router = require('express');
const Comment = require('../models/comments/Comments');

module.exports = Router()
  .post('', (req, res, next) => {
    Comment.insert(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Comment.findByEventId(req.params.id)
      .then(comments => res.send(comments))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Comment.delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  })
;
