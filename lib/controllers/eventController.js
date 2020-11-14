const Router = require('express');
const Event = require('../models/Event');

module.exports = Router()
  .post('/', (req, res, next) => {
    Event.insert(req.body)
      .then(event => res.send(event))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Event.findById(req.params.id)
      .then(event => res.send(event))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Event.findAll()
      .then(event => res.send(event))
      .catch(next);
  })
  
  .patch('/:id', (req, res, next) => {
    Event.update(req.params.id, req.body)
      .then(updatedEvent => res.send(updatedEvent))
      .catch(next);
  });
