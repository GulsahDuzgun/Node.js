const Tour = require('../models/tourModel');
const APIFeautures = require('../utilities/apiFeatures');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  //const tour2 = await Tour.findOne({_id: req.params.id})
  // await Tour.findOne({ search field: search value})

  if (!tour) return next(new AppError('No tour found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

const getAllTours = catchAsync(async (req, res, next) => {
  const query = Tour.find();
  const tourFeatures = new APIFeautures(query, req.query)
    .filter()
    .limit()
    .paginate()
    .sort();
  //query = query.find().sort().select().skip().limit();

  console.log(tourFeatures.expressQueryObj);
  const tours = await tourFeatures.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const createTour = catchAsync(async (req, res, next) => {
  // const temp = new Tour(req.body);
  // temp.save()

  const tourTemp = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: tourTemp,
    },
  });
});

const updateTour = catchAsync(async (req, res, next) => {
  const updatedTour = await Tour.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
    (err) => {
      return next(new AppError('No tour found with that ID', 404));
    }
  );

  if (!updatedTour)
    return next(new AppError('No tour found with that ID', 404));

  res.status(200).json({
    status: 'succes',
    data: {
      tour: updatedTour,
    },
  });
});

const deleteTour = catchAsync(async (req, res, next) => {
  // const deletedTour = await Tour.deleteOne({ _id: req.params.id });
  const deletedTour = await Tour.findByIdAndDelete(req.params.id, (err) => {
    return next(new AppError('No tour found with that ID', 404));
  });
  console.log(deleteTour);
  if (!deletedTour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: 'null',
  });
});

const aliasTopTours = (req, res, next) => {
  // Sort documents ascending and when there is a tie then looks for other parameters
  req.query.sort = 'price, -ratingAverage';
  req.query.limit = '5';
  req.query.fields = 'name, price,ratingAverage,summary, difficulty';
  next(); //middleware exit
};

const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingAverage: { $gte: 0 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingQuantity' },
        avgRating: { $avg: '$ratingAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { numTours: 1 } },
  ]);
  res.status(200).json({
    status: 'succes',
    data: {
      stats,
    },
  });
});

const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  console.log(year);
  const plan = await Tour.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: {
          $push: {
            name: '$name',
            price: '$price',
          },
        },
      },
    },
    { $addFields: { month: '$_id' } },
    { $project: { _id: 0 } },
    { $sort: { numTourStarts: -1 } },
  ]);
  res.status(200).json({
    status: 'succes',
    data: {
      plan,
    },
  });
});

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
};
