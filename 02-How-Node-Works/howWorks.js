const fs = require('fs');
const crypto = require('crypto');
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

console.log('Hello from Top Level Code');

fs.readFile('./test.txt', 'utf-8', () => {
  console.log('---------------');
  console.log('I/O is being processed');
  setTimeout(() => console.log('Timer 1 finished'), 0);
  setImmediate(() => console.log('Immediate 2 finished'));
  setTimeout(() => console.log('Timer 2 finished'), 2);
  setTimeout(() => console.log('Timer 2 finished'), 4);
  process.nextTick(() => console.log('Process.nextTick'));

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now(), 'Password enctrypted');
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now(), 'Password enctrypted');
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now(), 'Password enctrypted');
});
