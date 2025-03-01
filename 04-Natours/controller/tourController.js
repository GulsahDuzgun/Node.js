const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    //1- Filtering
    const queryObj = { ...req.query };
    const excludedFieds = ['page', 'sort', 'limit', 'fields'];
    excludedFieds.forEach((el) => delete queryObj[el]);

    //2- Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    //3- Sorting
    console.log(req.query);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //4- Limiting
    if (req.query.fields) {
      const limitBy = req.query.fields.split(',').join(' ');
      query = query.select(limitBy);
    } else {
      query = query.select('-__v');
    }

    //5- Pagination
    const limit = req.query.limit * 1 || 100;
    const page = req.query.page * 1 || 1;
    const skipedCount = (page - 1) * limit;
    query = query.skip(skipedCount).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skipedCount > numTours) throw new Error('This page does not exist');
    }

    const tours = await query;
    //query = query.find().sort().select().skip().limit();

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

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
