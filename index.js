
const jobs = require('./routes/jobs');
const recruiters = require('./routes/recruiters');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const config = require('config');
const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('express-async-errors');
const express = require('express');
const app = express();


if(!config.get("jwtPrivateKey"))
      throw new Error('FATAL ERROR: jwtPrivateKey is not defined');


app.use(express.json());
app.use('/api/jobs', jobs);
app.use('/api/recruiters', recruiters);
app.use('/api/auth', auth);
app.use(error);


mongoose.connect('mongodb://localhost/jtank')
        .then(() => console.log('connection succesful'))
        .catch((err) => console.error('Connection unsuccesful ' + err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`listening on port ${port}`));

module.exports = server;