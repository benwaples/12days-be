const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const UserService = require('../services/user-services');


module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService.signup(req.body)
      .then(user => {
        UserService.setSessionCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    UserService.authorize(req.body)
      .then(user => {
        UserService.setSessionCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })
  
  .get('/verify', authMiddleware, (req, res) => {
    res.send(req.user);
  });
