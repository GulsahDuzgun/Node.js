const fs = require('fs');
const server = require('http').createServer();

//Solution 2 -> Streams

//Solition 1

// server.on('request', (req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'text/html',
//   });
//   fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
// with all data file is read and kept a variable to send
//     res.end(data);
//   });
// });

//Soluiton 2
// Every ready chunked data  is emitted the data event end it's written to res and send with end event. But response is sent every chunced data and after it send with response the variable value remove and assign again. But the readable stream is faster than response so there is a backpressure issue. To solve that we should use pipe function on readable stream.

server.on('request', (req, res) => {
  const readable = fs.createReadStream('./test-file.txt');
  readable.on('data', (chunk) => {
    res.write(chunk);
  });

  readable.on('end', () => {
    res.end();
  });

  readable.on('error', (err) => {
    console.log(err);
    res.statusCode(500);
    res.end('File not found');
  });
});

server.listen(9500, '127.0.0.1', () => {
  console.log('server on listenin on http://127.0.0.1:9500');
});
