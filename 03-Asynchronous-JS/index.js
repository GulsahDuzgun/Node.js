const fs = require('fs');
const superagent = require('superagent');

fs.readFile('./dog.txt', 'utf-8', (err, data) => {
  if (err) return console.log('Not Found');

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);

      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image is saved to file');
      });
    });
});
