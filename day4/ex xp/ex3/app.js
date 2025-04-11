const { readFile, writeFile } = require('./fileManager');

// Read from Hello World.txt
const content = readFile('Hello World.txt');
console.log(content);

// Write to Bye World.txt
writeFile('Bye World.txt', 'Writing to the file');