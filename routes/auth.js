
const express = require('express');
const Joi = require('joi-browser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {Recruiter} = require('../models/recruiter');
const router = express.Router();


router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const rec = await Recruiter.findOne({email: req.body.email});
    if(!rec) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, rec.password);
    if(!validPassword) return res.status(400).send('Invalid email or Password');

    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    res.send(token);
});

const validate = (req) => {
    const schema = {
        email: Joi.string().trim().email().required().max(255),
        password: Joi.string().trim().required().max(50)
    };

    return Joi.validate(req, schema);
}

module.exports = router;