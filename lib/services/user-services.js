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

const authorize = async({ username, password }) => {
  const user = await User.findByUserName(username);
  if(!user) throw new Error('Invalid username/password');

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if(!validPassword) throw new Error('Invalid username/password');

  return user;
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
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true
  });
};

module.exports = {
  signup,
  authorize, 
  authToken,
  verifyToken,
  setSessionCookie
};
