
const express = require('express');
require('express-async-errors');
const jobs = require('../routes/jobs');
const recruiters = require('../routes/recruiters');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/jobs', jobs);
    app.use('/api/recruiters', recruiters);
    app.use('/api/auth', auth);
    app.use(error);
}