const { error } = require('console');
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
    resolve('Success');
  });

// Promise
// readFilePromise('./dog.txt')
//   .then((data) =>
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//   )
//   .then((res) => writeToFilePromise('dog-img.txt', res.body.message))
//   .catch((err) => {
//     console.log(err);
//   });

//-------------------------------------------------
// Asynchronous Function returns Promise
// Async-Await Function is process on the background and when a Promise await it behave like synchronous function and untill return a value. This Async function take to thread pool. Event Loop is keep processing to code besides this.

const readAndWriteFileAsync = async () => {
  try {
    const data = await readFilePromise('./dog.txt');
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    await writeToFilePromise('dog-img.txt', res.body.message);
    return 'Logs 🧩';
  } catch (err) {
    console.log(err);
    throw err;
  }
};

(async () => {
  try {
    console.log('Step -> 1');
    const x = await readAndWriteFileAsync();
    console.log(x);
    console.log('Step -> 3');
  } catch (err) {
    console.log(err);
  }
})();
