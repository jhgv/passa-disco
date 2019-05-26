const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const albumRoutes = require('./api/routes/albums');

// Setting  middlewares for the requests
app.use(morgan('dev'));
// Make uploaded files public
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Change here if new hosts start using this API
app.use(cors({ origin: 'http://localhost:3000' }));

// Album API routes
app.use('/album', albumRoutes);

// If no route matches the request URL
app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404);
  next(error);
});

// Handling error responses
app.use((error, req, res, next) => {
  res.send({
    error: {
      message: error.message
    }
  });
  next(error);
});

module.exports = app;
