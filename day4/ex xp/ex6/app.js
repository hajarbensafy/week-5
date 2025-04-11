const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));
console.log(chalk.red.bold('Error!'));
console.log(chalk.green.inverse('Success!'));
console.log(chalk.yellow('Warning: ') + chalk.white('This is important.'));
console.log(chalk.hex('#FF8800')('Custom color!'));