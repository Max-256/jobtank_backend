
const express = require('express');
const {Job, validateJob} = require('../models/job');
const router = express.Router();

router.post("/", async (req, res) => {
    const {error} = validateJob(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const job = new Job(req.body);
    await job.save();
    res.send(job);    
});

router.put("/:id", async (req, res) => {
    const job = await Job.findById(req.params.id);
    if(!job) res.status(404).send('The job with the given id was not found');
    const {error} = validateJob(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    job.set({
      companyName: req.body.companyName,
      deadline: req.body.deadline,
      aboutCompany: req.body.aboutCompany,
      title: req.body.title,
      location: req.body.location,
      duties: req.body.duties,
      qualifications: req.body.qualifications,
      experience: req.body.experience,
      benefits: req.body.benefits,
      howToApply: req.body.howToApply,
      other: req.body.other
    });
    await job.save();
    res.send(job);
});

router.get("/", async (req, res) => {
    const jobs = await Job.find();
    res.send(jobs);
});

router.get("/:id", async (req, res) => {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).send('The job with the given id was not found');
    res.send(job);
});

router.delete("/:id", async (req, res) => {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).send("The job with the given id is not available");
    await Job.deleteOne({"_id": req.params.id});
    res.send(job);
});

module.exports = router;