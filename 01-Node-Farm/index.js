const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Request has just hit');
  console.lof(req);
});

server.listen(8000, '127.0.0.1', () => {
  console.log(`Server is listening on http://127.0.0.1:8000`);
});

//Synchronous file reading
/*
const fileContent = fs.readFileSync('./read.txt', 'utf-8');

console.log(fileContent);

fs.writeFileSync('./out-put.txt', fileContent);
console.log('File has been written');


//Asynchronous file reading
/*
console.log('Asynchronous reading started');
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
  if (err) return console.log(err);
  fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data) => {
    console.log(data);
    fs.writeFile('./txt/output.txt', data, 'utf-8', (err) => {
      if (err) return console.log(err);
    });
  });
});
console.log('Asynchronous reading finished');
*/
