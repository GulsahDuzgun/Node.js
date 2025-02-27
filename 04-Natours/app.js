const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

if (process.env.NODE_ENV === 'dev') app.use(morgan('dev'));

app.use(express.json()); //midlleware
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from our midlleware');
  next(); // if next method doesn't exist then it would not move on
});

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  console.log(req.requestedTime);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
