const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const port =
  app.get('env') === 'development'
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

app.listen(port, () => {
  console.log(`Express server is running on http://127.0.0.1:${port}`);
});
