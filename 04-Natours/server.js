const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Set NODE_ENV before loading app
dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

mongoose.connect(process.env.MONGO_DB_LINK, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const port =
  process.env.NODE_ENV === 'DEV'
    ? +process.env.DEV_PORT
    : +process.env.PROD_PORT;

app.listen(port, () => {
  console.log(`Express server is running on http://127.0.0.1:${port}`);
});
