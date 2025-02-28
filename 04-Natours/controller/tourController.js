const fs = require('fs');
const Tour = require('../models/tourModel');

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const item = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    requestedTime: req.requestedTime,
    data: {
      tour: item,
    },
  });
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

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tempTour = tours.find((item) => +item.id === id);

  const updatedTour = { ...tempTour, ...req.body };
  const tempArr = tours.map((el) => (el.id === id ? updatedTour : el));

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tempArr),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const id = +req.params.id;
  const currentTours = tours.filter((el) => el.id !== id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(currentTours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: 'No data',
      });
    }
  );
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
