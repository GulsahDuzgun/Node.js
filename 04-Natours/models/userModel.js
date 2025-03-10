const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    //validate just works for save and create methods
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match",
    },
  },
  photo: String,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
