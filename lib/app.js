const express = require('express');
const app = express();

app.use(require('cors')({
  origin: true,
  credentials: true
}));
app.use(require('cookie-parser')());
app.use(express.json());

app.use('/api/v1/auth', require('../lib/controllers/userController'));
app.use('/api/v1/events', require('../lib/controllers/eventController'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
