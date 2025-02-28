const mongoose = require('mongoose');

const Tour = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have name'],
    unique: true,
  },

  price: {
    type: Number,
    required: [true, 'Tour must have price'],
  },

  rating: {
    type: Number,
    default: 4.5,
  },
});

const tourSchema = mongoose.model('Tour', Tour);
module.exports = tourSchema;
