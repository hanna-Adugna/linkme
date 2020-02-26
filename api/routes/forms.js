const express = require('express');
const router = express.Router();

router.get('/:jobID', (req, res, next) => {
    res.status(200).json({
        message: "GET request for Form of a Job",
        jobID: req.params.jobID
    })
});

router.post('/:jobID', (req, res, next) => {
    let form = {
        questions: req.body.questions,
        jobID: req.params.jobID
    };

    res.status(201).json({
        message: "POST request to /forms",
        form: form
    });
});

router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: "PATCH request for Form",
        ID: req.params.id
    })
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: "DELETE request for Form",
        ID: req.params.id
    })
});

module.exports = router;