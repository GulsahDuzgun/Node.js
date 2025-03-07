const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

if (process.env.NODE_ENV == 'DEV') app.use(morgan('dev'));

app.use(express.json()); //midlleware
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("If there is 4 paramater then it's a error handler middleware");
  err.status = err.status || 'fail';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
