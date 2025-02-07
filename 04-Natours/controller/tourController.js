const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8')
);

const checkItem = (req, res, next, val) => {
  const id = +val;
  if (!tours.find((el) => el.id === id))
    return res.status(404).json({
      status: 'fail',
      message: 'There is no tour matches with id',
    });
  next();
};

const checkBody = (req, res, next) => {
  console.log(req);
  if (!req?.body?.name || !req?.body?.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'There is no price or name information',
    });
  }
  next();
};

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

const createTour = (req, res) => {
  const newTourId = tours[tours.length - 1].id + 1;
  const newTourBody = req.body;
  const newTour = Object.assign({ id: newTourId }, newTourBody);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
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
  checkItem,
  checkBody,
};
