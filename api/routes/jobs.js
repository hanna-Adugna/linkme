const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET All Jobs"
    });
});

router.post('/', (req, res, next) => {
    // Example of Parsing JSON request
    let job = {
        title: req.body.title,
        jobLength: req.body.jobLength
    };

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