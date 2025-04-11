const _ = require('lodash');
const { add, multiply } = require('./math');

const numbers = [1, 2, 3, 4, 5];

console.log(`Sum: ${add(5, 3)}`);
console.log(`Product: ${multiply(5, 3)}`);
console.log(`Shuffled numbers: ${_.shuffle(numbers)}`);
console.log(`Sum of numbers: ${_.sum(numbers)}`);