const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Answer = require('../models/answer.model');

router.get('/', (req, res, next) => {
    Answer.find()
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc.length > 0) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No Data Found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:answerID', (req, res, next) => {
    const id = req.params.answerID;
    Answer.findById(id)
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    message: 'No Data Found under Specified ID'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const answer = new Answer({
        _id: new mongoose.Types.ObjectId,
        formID: req.body.formID,
        answers: req.body.answers
    });
    answer.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Answers",
                postedAnswer: answer
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:answerID', (req, res, next) => {
    const id = req.params.answerID;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Answer.update(
        { _id: id }, { $set: updateOps }
    ).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:answerID', (req, res, next) => {
    const id = req.params.answerID;

    Answer.remove({
        _id: id
    }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;