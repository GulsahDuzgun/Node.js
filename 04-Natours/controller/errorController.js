module.exports = (err, req, res, next) => {
  console.log("If there is 4 paramater then it's a error handler middleware");
  err.status = err.status || 'fail';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
