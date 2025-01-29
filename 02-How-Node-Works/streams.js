const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
    res.end(data);
  });
});

server.listen(9500, '127.0.0.1', () => {
  console.log('server on listenin on http://127.0.0.1:9500');
});
