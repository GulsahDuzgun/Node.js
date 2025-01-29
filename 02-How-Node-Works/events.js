const EventEmitter = require('events');
const http = require('http');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
  }
}

// const myEmitter = new EventEmitter();
const myEmitter = new MyEmitter();
const server = http.createServer();

myEmitter.on('FiredFuncName', (sentParam) => {
  console.log('FiredFuncName function can send params like', sentParam);
  console.log('Function is triggered by event emitter');
});

myEmitter.on('FiredFuncName', () => {
  console.log('Function is triggered by event emitter');
});

myEmitter.emit('FiredFuncName', 5);

server.on('request', (req, res) => {
  res.end('Event Listener has caught the request event');
  console.log('Event Listener has caught the request event');
});

server.on('request', (req, res) => {
  console.log('-----------');
  console.log('Other res.end function');
  console.log(req.url);
  // res.end('Other res.end function');
});

server.listen(9500, '127.0.0.1', () =>
  console.log('server listen http://127.0.0.1:9500')
);
