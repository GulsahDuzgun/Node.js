const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less than 40 characters'],
      minlenght: [10, 'A tour must have more or equal than 10 characters'],
      //       validate: [
      //         validator.isAlpha,
      //         'A tour name must not have a number character',
      //       ],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be  below 5.0'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      //validate just for create document
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price({VALUE}) should be below than price ',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretDocument: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//Document Middleware is saved before save() and create() functions

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  console.log(this);
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log('Post Middleware');
  next();
});

//QUERY MIDDLEWARE

tourSchema.pre(/^find/, function (next) {
  this.find({ secretDocument: { $ne: true } });
  this.startTime = Date.now();
  next();
});

tourSchema.post(/^find/, function (document, next) {
  next();
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretDocument: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
