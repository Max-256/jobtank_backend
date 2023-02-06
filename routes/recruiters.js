
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Recruiter, validateRec} = require('../models/recruiter');
const router = express.Router();


router.post('/', async (req, res) => {
    const {error} = validateRec(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let rec = await Recruiter.findOne({"email": req.body.email})
    if(rec) return res.status(400).send('Email already registered');

    rec = new Recruiter(req.body);
    const salt =  await bcrypt.genSalt(10);
    rec.password = await bcrypt.hash(rec.password,salt);
    await rec.save();

    const token = jwt.sign({_id: this._id}, "jwtPrivatekey");

    res.header('x-auth-token',token).send(_.pick(rec, ['_id', 'username', 'email']));
});


module.exports = router;