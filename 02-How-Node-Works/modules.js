const calc = require('./test-module-1');
const calc2 = require('./test-module-2');
const { add } = require('./test-module-2');
const calcTemp = new calc();

console.log(calcTemp.add(4, 6));
console.log(calc2.add(4, 6));
console.log(add(6, 6));

// console.log(arguments);
console.log(require('module'));
console.log(require('module').wrapper);
