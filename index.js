
const jobs = require('./routes/jobs');
const recruiters = require('./routes/recruiters');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/jobs', jobs);
app.use('/api/recruiters', recruiters);


mongoose.connect('mongodb://localhost/jtank')
        .then(() => console.log('connection succesful'))
        .catch((err) => console.error('Connection unsuccesful ' + err));

const port = process.env.PORT || 3000;
const server = app.listen(port, console.log("listening on port " + port));

module.exports = server;