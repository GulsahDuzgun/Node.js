const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.MONGO_DB_LINK, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connection);
    console.log('Mongoose successfully has connected');
  });

const port =
  app.get('env') === 'development'
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

app.listen(port, () => {
  console.log(`Express server is running on http://127.0.0.1:${port}`);
});
