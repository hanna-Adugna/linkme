const mongoose = require('mongoose');

const Answer = require('../models/answer.model');

// GET all Answers from model
exports.getAll = (req, res, next) => {
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
};

// GET Answer data with specified ID
exports.getByID = (req, res, next) => {
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
};

// POST (create) an Answer
exports.createAnswer = (req, res, next) => {
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
};

// UPDATE
exports.updateAnswer = (req, res, next) => {
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
};

// DELETE
exports.deleteAnswer = (req, res, next) => {
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
};