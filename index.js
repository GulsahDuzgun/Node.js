const fs = require('fs');

const fileContent = fs.readFileSync('./read.txt', 'utf-8');

console.log(fileContent);

fs.writeFileSync('./out-put.txt', fileContent);
console.log('File has been written');
