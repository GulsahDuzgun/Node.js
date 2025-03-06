const Tour = require('../models/tourModel');
const APIFeautures = require('../utilities/apiFeatures');

const getAllTours = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Sometings went wrong',
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //const tour2 = await Tour.findOne({_id: req.params.id})
    // await Tour.findOne({ search field: search value})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Sometings went wrong',
    });
  }
};

const createTour = async (req, res) => {
  // const temp = new Tour(req.body);
  // temp.save()

  try {
    const tourTemp = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: tourTemp,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Sometings went wrong',
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'succes',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Sometings went wrong',
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    // const deletedTour = await Tour.deleteOne({ _id: req.params.id });
    await Tour.findOneAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: 'null',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Sometings went wrong',
    });
  }
};

const aliasTopTours = (req, res, next) => {
  // Sort documents ascending and when there is a tie then looks for other parameters
  req.query.sort = 'price, -ratingAverage';
  req.query.limit = '5';
  req.query.fields = 'name, price,ratingAverage,summary, difficulty';
  next(); //middleware exit
};

const getTourStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Sometings went wrong',
    });
  }
};

const getMonthlyPlan = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Sometings went wrong',
    });
  }
};

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
