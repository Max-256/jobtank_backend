
const mongoose = require('mongoose');
const Joi = require('joi-browser'); 

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        maxlength: 255
    },

    deadline: {
        type: String,
        required: true
    },

    aboutCompany: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
        maxlength: 255
    },

    location: {
        type: String,
        required: true,
        maxlength: 255
    },

    duties: {
        type: String,
        required: true
    },

    qualifications: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    benefits: {
        type: String
    },

    howToApply: {
        type: String,
        required: true
    },

    other: {
        type: String
    }
});

const Job = mongoose.model("Job", jobSchema);

const validateJob = (job) => {
    const schema = {
      companyName: Joi.string().max(255).required(),
      deadline: Joi.string().required(),
      aboutCompany: Joi.string().required(),
      title: Joi.string().max(255).required(),
      location: Joi.string().max(255).required(),
      duties: Joi.string().required(),
      qualifications: Joi.string().required(),
      experience: Joi.string().required(),
      benefits: Joi.string(),
      howToApply: Joi.string().required(),
      other: Joi.string()
    }

    return Joi.validate(job, schema);    
}

module.exports.Job = Job;
module.exports.validateJob = validateJob;