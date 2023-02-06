
const express = require('express');
const {Job, validateJob, notFound} = require('../models/job');
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
    if(!job) notFound(res);

    const {error} = validateJob(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    job.set(req.body);
    await job.save();
    res.send(job);
});

router.get("/", async (req, res) => {
    const jobs = await Job.find();
    res.send(jobs);
});

router.get("/:id", async (req, res) => {
    const job = await Job.findById(req.params.id);
    if(!job) notFound(res);
    res.send(job);
});

router.delete("/:id", async (req, res) => {
    const job = await Job.findById(req.params.id);
    if(!job) notFound(res);
    
    await Job.deleteOne({"_id": req.params.id});
    res.send(job);
});

module.exports = router;