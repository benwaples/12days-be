const Router = require('express');
const UserService = require('../services/user-services');


module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService.signup(req.body)
      .then(user => {
        UserService.setSessionCookie(res, user);
        res.send(user);
      })
      .catch(next);
  });
