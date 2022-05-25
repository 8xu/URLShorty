const chalk = require('chalk');

class Logger {
    static log(message) {
        console.log(`[LOG] ${chalk.green(message)}`);
    }

    static event(message) {
        console.log(`[EVENT] ${chalk.yellowBright(message)}`);
    }

    static warn(message) {
        console.log(`[WARN] ${chalk.magenta(message)}`);
    }

    static error(message) {
        console.log(`[ERROR] ${chalk.red(message)}`);
    }
};

module.exports = Logger;