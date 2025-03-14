const AppError = require('../utilities/appError');

const sendErrorDEV = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const handleCastErrorDb = (err) => {
  errMessage = `Invalid ${err.path}:${err.value}`;
  return new AppError(errMessage, 400);
};

const handleDuplicateFieldsDb = (err) => {
  const value = err?.keyValue?.name;
  const errMessage = `Dublicate field value:${value}. Please use another value`;
  return new AppError(errMessage, 400);
};

const handleValidationErrorDb = (err) => {
  const errMessages = Object.values(err.errors).map((el) => el?.message);
  const message = `Invalid input data ${errMessages.join('. ')}`;
  return new AppError(message, 400);
};

const handleExpiredToken = () =>
  new AppError('Your token has expired. Please log in again');

const handleJWTError = () =>
  new AppError('Invalid Token. Please log in again!', 404);
//Error control midleware
module.exports = (err, req, res, next) => {
  err.status = err.status || 'fail';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'DEV') {
    sendErrorDEV(res, err);
  } else if (process.env.NODE_ENV === 'PROD') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDb(error);
    if (err.code === 11000) error = handleDuplicateFieldsDb(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDb(error);
    if (err.name === 'TokenExpiredError') error = handleExpiredToken();
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    sendErrorProd(res, error);
  }
};
