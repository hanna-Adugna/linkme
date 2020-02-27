const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Job = require('../models/job.model');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET All Jobs"
    });
});

router.post('/', (req, res, next) => {
    // Example of Parsing JSON request
    // let job = {
    //     title: req.body.title,
    //     jobLength: req.body.jobLength
    // };
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        duration: req.body.duration
    });
    job
    .save().
    then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    
    res.status(201).json({
        message: "POST a Job",
        postedJob: job
    });
});

router.patch('/:jobID', (req, res, next) => {
    res.status(200).json({
        message: "PATCH request",
        ID: req.params.jobID
    });
});

router.delete('/:jobID', (req, res, next) => {
    res.status(404).json({
        message: "DELETE request",
        ID: req.params.jobID
    })
});

module.exports = router;