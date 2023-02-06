
const winston = require('winston');
const config = require('config');
require('winston-mongodb');

module.exports = () => {
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'})
    );

    process.on('unhandledRejection', function(ex){
        winston.error(ex.message, ex);
        process.exit(1)
    });

    winston.add(winston.transports.File, {filename: 'logfile.log'});
    winston.add(winston.transports.MongoDB, {db: config.get('db'), level: 'error'});
}