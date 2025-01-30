const fs = require('fs');
const superagent = require('superagent');

//then method only works for fullfilled promise, rejected promise will catch on catch block

fs.readFile('./dog.txt', 'utf-8', (err, data) => {
  if (err) return console.log('Not Found');

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image is saved to file');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
