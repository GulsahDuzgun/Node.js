const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(505).json({
    status: 'fail',
    message: 'There is no route has been set for this path',
  });
};

exports.creatUser = (req, res) => {
  res.status(505).json({
    status: 'fail',
    message: 'There is no route has been set for this path',
  });
};

exports.updateUser = (req, res) => {
  res.status(505).json({
    status: 'fail',
    message: 'There is no route has been set for this path',
  });
};

exports.deleteUser = (req, res) => {
  res.status(505).json({
    status: 'fail',
    message: 'There is no route has been set for this path',
  });
};
