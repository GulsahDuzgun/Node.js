const fs = require('fs');
const http = require('http');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const productData = JSON.parse(data);
console.log(productData);
console.log(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('OVERVIEW PAGE');
  } else if (pathName === '/products') {
    res.end('PRODUCTS');
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-header': '404 Header',
    });

    res.end('404 Response');
  }
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
