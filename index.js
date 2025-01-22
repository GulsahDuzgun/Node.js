const fs = require('fs');

const fileContent = fs.readFileSync('./read.txt', 'utf-8');

console.log(fileContent);
