const fs = require('fs');
const express = require('express');
const { json } = require('stream/consumers');
const app = express();

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

app.listen(9500, () => {
  console.log('Express server is running on 127.0.0.1:9500');
});
