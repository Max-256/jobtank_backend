
const jobs = require('./routes/jobs');
const recruiters = require('./routes/recruiters');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const config = require('config');
const winston = require('winston');
require('winston-mongodb');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('express-async-errors');
const express = require('express');
const app = express();



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



if(!config.get("jwtPrivateKey"))
      throw new Error('FATAL ERROR: jwtPrivateKey is not defined');


app.use(express.json());
app.use('/api/jobs', jobs);
app.use('/api/recruiters', recruiters);
app.use('/api/auth', auth);
app.use(error);


const db = config.get('db');
mongoose.connect(db)
        .then(() => winston.info(`Connection to ${db} succesful`));
        

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`listening on port ${port}`));

module.exports = server;