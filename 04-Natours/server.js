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
    // console.log(con.connection);
    console.log('Mongoose successfully has connected');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: true,
    unique: true,
    default: 'name',
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);
const tourSample = new Tour({ name: 'Hiking', rating: 4.3, price: 500 });
tourSample
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err.message));

const port =
  app.get('env') === 'development'
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

app.listen(port, () => {
  console.log(`Express server is running on http://127.0.0.1:${port}`);
});
