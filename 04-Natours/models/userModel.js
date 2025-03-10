const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    requred: [true, 'User must has a name'],
  },
  email: {
    type: String,
    unique: true,
    requred: [true, 'User must has a email address'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    requred: [true, 'Password is required'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    requred: [true, 'Confirm Password is required'],
  },
  photo: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
