const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ app: 'natours', auhor: 'Gulsah Duzgun' });
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const item = tours.find((el) => el.id === id);

  if (!item)
    return res.status(404).json({
      status: 'fail',
      message: 'There is no tour matches with id',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour: item,
    },
  });
});

app.listen(9500, () => {
  console.log('Express server is running on 127.0.0.1:9500');
});
