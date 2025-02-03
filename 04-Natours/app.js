const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json()); //midlleware

app.use((req, res, next) => {
  console.log('Hello from our midlleware');
  next(); // if next method doesn't exist then it would not move on
});

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  console.log(req.requestedTime);
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

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

  if (!item)
    return res.status(404).json({
      status: 'fail',
      message: 'There is no tour matches with id',
    });

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
  if (!tours.find((el) => el.id === id))
    return res.status(404).send('Not Found tour');

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

const getAllUsers = (req, res) => {
  res.status(505).json({
    status: 'fail',
    message: 'There is no route has been set for this path',
  });
};

const getUser = (req, res) => {
  res.status(505).json({
    status: 'fail',
    message: 'There is no route has been set for this path',
  });
};

const creatUser = (req, res) => {
  res.status(505).json({
    status: 'fail',
    message: 'There is no route has been set for this path',
  });
};

const updateUser = (req, res) => {
  res.status(505).json({
    status: 'fail',
    message: 'There is no route has been set for this path',
  });
};

const deleteUser = (req, res) => {
  res.status(505).json({
    status: 'fail',
    message: 'There is no route has been set for this path',
  });
};

const toursRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);

toursRouter.route('/').get(getAllTours).post(createTour);

toursRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(creatUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.listen(9500, () => {
  console.log('Express server is running on 127.0.0.1:9500');
});
