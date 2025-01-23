const fs = require('fs');
const http = require('http');
const url = require('url');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const templateProductCard = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const productData = JSON.parse(data);
const replaceProductInfo = (templateProductHTML, product) => {
  let temp = templateProductHTML.replace(
    '/{%PRODUCTNAME%}/g',
    product.productName
  );
  temp = temp.replace(/{%ID%}/g, product.id);
  temp = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  temp = temp.replace(/{%IMAGE%}/g, product.image);
  temp = temp.replace(/{%FROM%}/g, product.from);
  temp = temp.replace(/{%NUTRIENTS%}/g, product.nutrients);
  temp = temp.replace(/{%QUANTITY%}/g, product.quantity);
  temp = temp.replace(/{%PRICE%}/g, product.price);
  temp = temp.replace(/{%DESCRIPTION%}/g, product.description);
  if (!product.organic) temp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return temp;
};

const server = http.createServer((req, res) => {
  const { pathname: pathName, query } = url.parse(req.url, true);

  if (pathName === '/' || pathName === '/overview') {
    res.writeHead('200', {
      'content-type': 'text/html',
    });

    const productList = productData
      .map((product) => replaceProductInfo(templateProduct, product))
      .join('');

    const output = templateOverview.replace('{%PRODUCT_CARDS%}', productList);
    res.end(output);
  } else if (pathName === '/product') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });

    const productTemplate = replaceProductInfo(
      templateProductCard,
      productData[query.id]
    );

    res.end(productTemplate);
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
