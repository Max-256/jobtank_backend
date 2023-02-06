
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi-browser');

const recruiterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1024
    }
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

const validateRec = (rec) => {
    const schema = {
        username: Joi.string().trim().max(255).required(),
        email: Joi.string().trim().email().min(5).max(255).required(),
        password: Joi.string().trim().min(5).max(50)
    }

    return Joi.validate(rec, schema);
}

module.exports.Recruiter = Recruiter;
module.exports.validateRec = validateRec;

