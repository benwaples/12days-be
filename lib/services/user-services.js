const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const _oneDay = 1000 * 60 * 60 * 24;

const signup = async({ username, password, avatarUrl, userRole }) => {
  const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

  return await User.insert({
    username,
    passwordHash,
    avatarUrl,
    userRole
  });
};

const authToken = user => {
  const token = jwt.sign({
    payload: user.toJSON()
  }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });

  return token;
};

const verifyToken = token => {
  const { payload } = jwt.verify(token, process.env.APP_SECRET);
  return payload;
};

const setSessionCookie = (res, user) => {
  const token = authToken(user);
  res.cookie('session', token, {
    maxAge: _oneDay,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'producetion' ? 'none' : 'lax',
    httpOnly: true
  });
};

module.exports = {
  signup,
  authToken,
  verifyToken,
  setSessionCookie
};
