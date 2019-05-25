const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const albumRoutes = require('./api/routes/albums');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use('/album', albumRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.send({
    error: {
      message: error.message
    }
  });
  next(error);
});

module.exports = app;
