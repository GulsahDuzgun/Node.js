const fs = require('fs');
const superagent = require('superagent');

//then method only works for fullfilled promise, rejected promise will catch on catch block

//Can be make a Promise Chain by returning Promise and take fullfilled value with then function

const readFilePromise = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err?.message);
      resolve(data);
    });
  });

const writeToFilePromise = (filePath, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) reject('There is an error while writing the file');
    });
  });

readFilePromise('./dog.txt')
  .then((data) =>
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  )
  .then((res) => writeToFilePromise('dog-img.txt', res.body.message))
  .catch((err) => {
    console.log(err);
  });
