const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ app: 'natours', auhor: 'Gulsah Duzgun' });
});

app.post('/', (req, res) => {
  res.send('Server Post request');
});

app.listen(9500, () => {
  console.log('Express server is running on 127.0.0.1:9500');
});
