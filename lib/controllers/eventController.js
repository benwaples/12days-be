const Router = require('express');
const Event = require('../models/Event');

module.exports = Router()
  .post('/', (req, res, next) => {
    Event.insert(req.body)
      .then(event => res.send(event));
  });
