const express = require('express');
const router = express.Router();

router.get('/:formID', (req, res, next) => {
    res.status(200).json({
        message: "GET request for Answer of a Form",
        formID: req.params.formID
    })
});

router.post('/:formID', (req, res, next) => {
    let answer = {
        answers: req.body.answers,
        formID: req.params.formID
    };

    res.status(201).json({
        message: "POST request to /answers",
        answer: answer
    });
});

router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: "PATCH request for Answer",
        ID: req.params.id
    })
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: "DELETE request for Answer",
        ID: req.params.id
    })
});

module.exports = router;