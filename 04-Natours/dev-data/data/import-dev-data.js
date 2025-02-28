const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('../../models/tourModel');

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

mongoose.connect(process.env.MONGO_DB_LINK, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully imported');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

const deleteCollection = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteCollection();
