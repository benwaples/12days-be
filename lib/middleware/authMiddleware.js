const UserService = require('../services/user-services');

module.exports = (req, res, next) => {
  const session = req.cookies.session;
  const user = UserService.verifyToken(session);
  req.user = user;
  next();
};
